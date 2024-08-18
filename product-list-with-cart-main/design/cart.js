import {products, renderPrice} from './products.js';
import {AddtoCartButtons} from './main.js';

export const cart = [
];

export function refreshCart() {
    
    let cartHTML = '';     
    let cartTotalQuantity = 0;
    let orderPrice = 0;

    cart.forEach((item) => {
        let matchingItem;
        cartTotalQuantity += item.quantity;
        products.forEach((product) => {
            if (item.productId === product.id) {
                matchingItem = product;
            }
        });

        cartHTML +=
        `
            <div class="cart-item" data-product-id='${matchingItem.id}'>
                <div class="cart_item__text-box">
                    <p class="cart-item__name">${matchingItem.name}</p>
                    <div>
                        <span class="cart-item__quantity">${item.quantity}x</span>
                        <span class="cart-item__price-apiece">@ $${renderPrice(matchingItem.price)}</span>
                        <span class="cart-item__price-overall">$${renderPrice(matchingItem.price * item.quantity)}</span>
                    </div>
                </div>
                <img src="../assets/images/icon-remove-item.svg" class="remove-from-cart">
            </div>
        `
        orderPrice += matchingItem.price * item.quantity;
    });

    document.querySelector('.js-cart').innerHTML = `<h1 class="cart-quantity">Your Cart (${cartTotalQuantity})</h1>` + cartHTML + `
    <div class="lower-part-cart">
        <div class="lower-part-order-total">
            <span>Order Total</span>
            <span class="order-price">$${renderPrice(orderPrice)}</span>
        </div>
        <div class="carbon-section">
            <img src="../assets/images/icon-carbon-neutral.svg" class="carbon-image">
            <p class="carbon-text">This is a <b>carbon-neutral</b> delivery</p>
        </div>
        <button class="cart-confirm-order">Confirm Order</button>
    </div>
    `
    ;
}

export function refreshFullCart() {
    
    if (cart.length > 0) {
        
        refreshCart();

        const removeItemButtons = document.querySelectorAll('.remove-from-cart');

        removeItemButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                removeCartItem(event.target.parentElement.dataset.productId);
            });
        });
    } else {
        document.querySelector('.js-cart').innerHTML = 
        `
        <h1 class="cart-quantity">Your Cart (0)</h1>
        <img src="../assets/images/illustration-empty-cart.svg" class="empty-cart-img">
        <p class="empty-cart-text">Your added items will appear here</p>
        `;
    }
}
refreshFullCart();

function removeCartItem(productId) {
    cart.forEach((item, index) => {
        if (item.productId === productId) cart.splice(index, 1);
    });
    refreshFullCart();
}
