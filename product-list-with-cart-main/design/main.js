import {products, renderPrice} from './products.js';
import {cart, refreshFullCart} from './cart.js';

let gridHTML = '';
products.forEach((product) => {
    gridHTML +=
    `
    <div class="product-box">
        <div class="product-box__image-n-button">
            <img src=".${product.image.mobile}" alt="${product.category}" class="product-box__image-mobile">
            <img src=".${product.image.tablet}" alt="${product.category}" class="product-box__image-tablet">
            <img src=".${product.image.desktop}" alt="${product.category}" class="product-box__image-desktop">
            <button class="product-box__button js-product-box-button hoverOn" data-product-id='${product.id}'>
                <img src="../assets/images/icon-decrement-quantity.svg" class="decrement-quantity" data-quantity>
                <img src="../assets/images/icon-add-to-cart.svg" class="cart-image">
                <span class="button-text">Add to Cart</span>
                <img src="../assets/images/icon-increment-quantity.svg" class="increment-quantity" data-quantity>
            </button>
        </div>
        <p class="product-box__short-name">${product.category}</p>
        <p class="product-box__full-name">${product.name}</p>
        <p class="product-box__price">$${renderPrice(product.price)}</p> 
    </div>
    `
});
document.querySelector('.grid').innerHTML = gridHTML;

export const AddtoCartButtons = document.querySelectorAll('.js-product-box-button');
AddtoCartButtons.forEach((button) => {
    const minusButton = button.children[0];
    const cartImage = button.children[1];
    const buttonText = button.children[2];
    const plusButton = button.children[3];

    let buttonIsClicked = false;
    function addBorderImg() {
        if (!buttonIsClicked) {
            button.parentElement.classList.add('image-add-border');
            buttonIsClicked = true;
        } else {
            button.parentElement.classList.remove('image-add-border');
            buttonIsClicked = false;
        }
    }

    let hoverIsOn = true;
    function toggleHover() {
        if (hoverIsOn) {
            button.classList.remove('hoverOn');
            hoverIsOn = false;
        } else {
            button.classList.add('hoverOn');
            hoverIsOn = true;
        }
    }

    let itemQuantity;

    function toggleOnSelectQuality() {
        toggleHover();
        addBorderImg();
        itemQuantity = 1;
        cartImage.style.display = 'none';
        button.classList.add('product-box__button-toggle');
        buttonText.style.margin = 'auto';
        buttonText.innerHTML = `${itemQuantity}`;
        minusButton.style.display = 'block';
        plusButton.style.display = 'block';
    } 

    function toggleOffSelectQuality(productId) {
        toggleHover();
        addBorderImg();
        cartImage.style.display = 'block';
        button.classList.remove('product-box__button-toggle');
        buttonText.style.margin = '0';
        buttonText.innerHTML = 'Add to Cart';
        minusButton.style.display = 'none';
        plusButton.style.display = 'none';  
        const item = {
            quantity: itemQuantity,
            productId
        };

        let index = cart.findIndex(cartItem => cartItem.productId === item.productId);
        if (index === -1) {
            cart.push(item);
        } else {
            cart[index].quantity += itemQuantity;
        }
        refreshFullCart();
    }

    let isButtonToggled = false;

    button.addEventListener('click', (event) => {
        if (!isButtonToggled) {
            toggleOnSelectQuality();
            isButtonToggled = true;
        } else {
            if (event.target.closest('[data-quantity]') != null) return;
            toggleOffSelectQuality(event.target.closest('button').dataset.productId);
            isButtonToggled = false;
        }
    });

    minusButton.addEventListener('click', () => {
        if (itemQuantity > 1) {
            itemQuantity--;
            buttonText.innerHTML = `${itemQuantity}`;
        }
    });

    plusButton.addEventListener('click', () => {
        itemQuantity++;
        buttonText.innerHTML = `${itemQuantity}`;
    });

});


