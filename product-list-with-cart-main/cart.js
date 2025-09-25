import { getRestProducts, renderPrice } from "./products.js";

export let cart = [];

let products = [];
let productMap = new Map();

export function setProducts(fetchedProducts) {
  products = fetchedProducts;
  productMap = new Map(products.map((p) => [p.id, p]));
}

function getCartDetails() {
  return cart.map((item) => {
    const product = productMap.get(item.productId);
    return {
      ...item,
      product,
      totalPrice: item.quantity * product.price,
    };
  });
}

function calculateCartTotals() {
  const details = getCartDetails();
  let totalPrice = 0;
  let totalQuantity = 0;
  details.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.totalPrice;
  });

  return { totalQuantity, totalPrice };
}

function renderCart() {
  const cartContainer = document.querySelector(".js-cart");
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <h1 class="cart-quantity">Your Cart (0)</h1>
      <img src="./assets/images/illustration-empty-cart.svg" class="empty-cart-img">
      <p class="empty-cart-text">Your added items will appear here</p>
    `;
    return;
  }

  const cartDetails = getCartDetails();
  const { totalQuantity, totalPrice } = calculateCartTotals();

  let cartHTML = cartDetails
    .map(
      (item) => `
    <div class="cart-item" data-product-id="${item.product.id}">
      <div class="cart_item__text-box">
        <p class="cart-item__name">${item.product.name}</p>
        <div>
          <span class="cart-item__quantity">${item.quantity}x</span>
          <span class="cart-item__price-apiece">@ $${renderPrice(
            item.product.price
          )}</span>
          <span class="cart-item__price-overall">$${renderPrice(
            item.totalPrice
          )}</span>
        </div>
      </div>
      <img src="./assets/images/icon-remove-item.svg" class="remove-from-cart">
    </div>
  `
    )
    .join("");

  cartContainer.innerHTML = `
    <h1 class="cart-quantity">Your Cart (${totalQuantity})</h1>
    ${cartHTML}
    <div class="lower-part-cart">
      <div class="lower-part-order-total">
        <span>Order Total</span>
        <span class="order-price">$${renderPrice(totalPrice)}</span>
      </div>
      <div class="carbon-section">
        <img src="./assets/images/icon-carbon-neutral.svg" class="carbon-image">
        <p class="carbon-text">This is a <b>carbon-neutral</b> delivery</p>
      </div>
      <button class="cart-confirm-order">Confirm Order</button>
    </div>
  `;
}

function removeCartItem(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  refreshFullCart();
}

// Modal
let modalIsOn = false;
const modal = document.querySelector(".confirmation-modal");

function renderModal() {
  const modalContainer = document.querySelector(".items-preview");
  const cartDetails = getCartDetails();
  const { totalPrice } = calculateCartTotals();

  const itemsHTML = cartDetails
    .map(
      (item) => `
    <div class="modal__cart-item">
      <div class="modal__img-n-text">
        <img src="${item.product.image.thumbnail}" alt="${
        item.product.category
      }">
        <div class="modal__item-text">
          <p class="modal__item-name">${item.product.name}</p>
          <span class="modal__quantity">${item.quantity}x</span>
          <span class="modal__price-per-unit">@ $${renderPrice(
            item.product.price
          )}</span>
        </div>
      </div>
      <span class="modal__total-price">$${renderPrice(item.totalPrice)}</span>
    </div>
  `
    )
    .join("");

  modalContainer.innerHTML =
    itemsHTML +
    `
    <div class="modal__total-order">
      <span>Order Total</span>
      <span>$${renderPrice(totalPrice)}</span>
    </div>
  `;
}
export function refreshFullCart() {
  renderCart();

  document.querySelector(".js-cart").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-from-cart")) {
      const productId = e.target.closest(".cart-item").dataset.productId;
      removeCartItem(productId);
    }
  });

  const confirmBtn = document.querySelector(".cart-confirm-order");
  if (confirmBtn) {
    confirmBtn.onclick = () => {
      renderModal();
      modalIsOn = true;
      if (window.innerWidth <= 768) {
        modal.showModal();
        modal.style.display = "flex";
        setTimeout(() => (modal.style.transform = "translateY(-100%)"), 300);
      } else {
        modal.showModal();
        modal.style.display = "flex";
        modal.classList.add("confirmation-modal-desktop");
      }
    };
  }

  const startNewOrderBtn = document.querySelector(".start-new-order");
  if (startNewOrderBtn) {
    startNewOrderBtn.onclick = () => {
      cart = [];
      modalIsOn = false;
      if (window.innerWidth <= 768) {
        modal.style.transform = "translateY(0)";
        setTimeout(() => {
          modal.style.display = "none";
          modal.close();
        }, 300);
      } else {
        modal.style.display = "none";
        modal.classList.remove("confirmation-modal-desktop");
        modal.close();
      }
      refreshFullCart();
    };
  }
}

// Modal resize handler
window.addEventListener("resize", () => {
  if (!modalIsOn) return;
  if (window.innerWidth <= 768) {
    modal.classList.remove("confirmation-modal-desktop");
  } else {
    modal.classList.add("confirmation-modal-desktop");
  }
});

refreshFullCart();
