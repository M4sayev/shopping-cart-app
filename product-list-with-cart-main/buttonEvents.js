import { cart, refreshFullCart } from "./cart.js";

export function setupAddToCartButtons() {
  const AddtoCartButtons = document.querySelectorAll(".js-product-box-button");
  AddtoCartButtons.forEach((button) => {
    const minusButton = button.children[0];
    const cartImage = button.children[1];
    const buttonText = button.children[2];
    const plusButton = button.children[3];

    let buttonIsClicked = false;
    function addBorderImg() {
      if (!buttonIsClicked) {
        button.parentElement.classList.add("image-add-border");
        buttonIsClicked = true;
      } else {
        button.parentElement.classList.remove("image-add-border");
        buttonIsClicked = false;
      }
    }

    let hoverIsOn = true;
    function toggleHover() {
      if (hoverIsOn) {
        button.classList.remove("hoverOn");
        hoverIsOn = false;
      } else {
        button.classList.add("hoverOn");
        hoverIsOn = true;
      }
    }

    let itemQuantity;

    function toggleOnSelectQuality() {
      toggleHover();
      addBorderImg();
      itemQuantity = 1;
      cartImage.style.display = "none";
      button.classList.add("product-box__button-toggle");
      buttonText.style.margin = "auto";
      buttonText.innerHTML = `${itemQuantity}`;
      minusButton.style.display = "block";
      plusButton.style.display = "block";
    }

    function resetButtonUI() {
      toggleHover();
      addBorderImg();
      cartImage.style.display = "block";
      button.classList.remove("product-box__button-toggle");
      buttonText.style.margin = "0";
      buttonText.innerHTML = "Add to Cart";
      minusButton.style.display = "none";
      plusButton.style.display = "none";

      isButtonToggled = false;

      buttonIsClicked = false;
      hoverIsOn = true;
    }

    function toggleOffSelectQuality(productId) {
      resetButtonUI();
      const item = {
        quantity: itemQuantity,
        productId,
      };

      let index = cart.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );
      if (index === -1) {
        cart.push(item);
      } else {
        cart[index].quantity += itemQuantity;
      }
      refreshFullCart();
    }

    let isButtonToggled = false;

    button.addEventListener("click", (event) => {
      if (!isButtonToggled) {
        toggleOnSelectQuality();
        isButtonToggled = true;
      } else {
        if (event.target.closest("[data-quantity]") != null) return;
        toggleOffSelectQuality(
          event.target.closest("button").dataset.productId
        );
        isButtonToggled = false;
      }
    });

    minusButton.addEventListener("click", (event) => {
      if (itemQuantity === 1) {
        event.stopPropagation();
        resetButtonUI();
        isButtonToggled = false;
      } else if (itemQuantity > 1) {
        itemQuantity--;
        buttonText.innerHTML = `${itemQuantity}`;
      }
    });

    plusButton.addEventListener("click", () => {
      itemQuantity++;
      buttonText.innerHTML = `${itemQuantity}`;
    });
  });
}
