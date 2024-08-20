import {products, renderPrice} from './products.js';
import {AddtoCartButtons} from './main.js';

export let cart = [
    // {
    //     quantity: 1,
    //     productId: '10001'
    // },
    // {
    //     quantity: 2,
    //     productId: '10000'
    // }
];


function refreshCart() {

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

let modalIsOn = false;
const modal = document.querySelector('.confirmation-modal');

export function refreshFullCart() {
    
    if (cart.length > 0) {
        
        refreshCart();

        const removeItemButtons = document.querySelectorAll('.remove-from-cart');

        removeItemButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                removeCartItem(event.target.parentElement.dataset.productId);
            });
        });
        // confirm
        document.querySelector('.cart-confirm-order').addEventListener('click', () => {
            addToModal();
            modalIsOn = true;
            if (window.innerWidth <= 768) {
                modal.showModal();
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.style.transform = 'translateY(-100%)';
                }, 300);
            } else {
                modal.showModal();
                modal.style.display = 'flex';
                modal.classList.add('confirmation-modal-desktop');
            }
        });
        document.querySelector('.start-new-order').addEventListener('click', () => {
            cart = [];
            modalIsOn = false;
            if (window.innerWidth <= 768) {
                modal.style.transform = 'translateY(0)';
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.close();
                }, 300); 
            } else {
                modal.style.display = 'none';
                modal.classList.remove('confirmation-modal-desktop');
                modal.close();
            }
            refreshFullCart()
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

const prevWidth = window.innerWidth;
window.addEventListener('resize', () => {
    const difference = prevWidth - window.innerWidth;
    console.log(prevWidth);
    console.log(difference);
    if (modalIsOn && (difference > 0)) {
        if (window.innerWidth <= 768) {
            modal.style.transform = 'translateY(0)';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.close();
            }, 300); 
        } else {
            modal.style.display = 'none';
            modal.classList.remove('confirmation-modal-desktop');
            modal.close();
        }
        modalIsOn = false;
    }
});

function removeCartItem(productId) {
    cart.forEach((item, index) => {
        if (item.productId === productId) cart.splice(index, 1);
    });
    refreshFullCart();
}



function addToModal() {
    let itemsPreviewHTML = '';
    let orderPrice = 0;

    cart.forEach((item) => {

        let matchingItem;
        products.forEach((product) => {
            if (item.productId === product.id) {
                matchingItem = product;
            }
        });

        itemsPreviewHTML += 
        `
        <div class="modal__cart-item">
            <div class="modal__img-n-text">
                <img src=".${matchingItem.image.thumbnail}" alt="${matchingItem.category}">
                <div class="modal__item-text"> 
                    <p class="modal__item-name">${matchingItem.name}</p>
                    <span class="modal__quantity">${item.quantity}x</span>
                    <span class="modal__price-per-unit">@ $${renderPrice(matchingItem.price)}</span>
                </div>
            </div> 
            <span class="modal__total-price">$${renderPrice(matchingItem.price * item.quantity)}</span>
        </div>
        `
        orderPrice += matchingItem.price * item.quantity;
    });

    document.querySelector('.items-preview').innerHTML = itemsPreviewHTML + 
    `
        <div class="modal__total-order">
            <span>Order Total</span>
            <span>$${renderPrice(orderPrice)}</span>
        </div>
    `
}




