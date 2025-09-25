import { fetchProducts, renderPrice } from "./products.js";
import { setupAddToCartButtons } from "./buttonEvents.js";
import { setProducts } from "./cart.js";
const grid = document.querySelector(".grid");

grid.innerHTML = `<p class="loading">Loading products...</p>`;

async function init() {
  const products = await fetchProducts();

  if (products.length === 0) {
    grid.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
    return;
  }

  // set products in cart module
  setProducts(products);

  let gridHTML = "";

  products.forEach((product) => {
    gridHTML += `
      <div class="product-box">
          <div class="product-box__image-n-button">
              <img src="${product.image.mobile}" alt="${
      product.category
    }" class="product-box__image-mobile">
              <img src="${product.image.tablet}" alt="${
      product.category
    }" class="product-box__image-tablet">
              <img src="${product.image.desktop}" alt="${
      product.category
    }" class="product-box__image-desktop">
              <button class="product-box__button js-product-box-button hoverOn" data-product-id='${
                product.id
              }'>
                  <img src="./assets/images/icon-decrement-quantity.svg" class="decrement-quantity" data-quantity>
                  <img src="./assets/images/icon-add-to-cart.svg" class="cart-image">
                  <span class="button-text">Add to Cart</span>
                  <img src="./assets/images/icon-increment-quantity.svg" class="increment-quantity" data-quantity>
              </button>
          </div>
          <p class="product-box__short-name">${product.category}</p>
          <p class="product-box__full-name">${product.name}</p>
          <p class="product-box__price">$${renderPrice(product.price)}</p> 
      </div>
      `;
  });
  grid.innerHTML = gridHTML;

  // rebind button logic
  setupAddToCartButtons();
}

init();
