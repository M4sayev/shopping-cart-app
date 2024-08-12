import {products} from './products.js';

let gridHTML = '';
products.forEach((product) => {
    gridHTML +=
    `
    <div class="product-box">
        <div class="product-box__image-n-button">
            <img src=".${product.image.mobile}" alt="${product.category}" class="product-box__image-mobile">
            <img src=".${product.image.tablet}" alt="${product.category}" class="product-box__image-tablet">
            <img src=".${product.image.desktop}" alt="${product.category}" class="product-box__image-desktop">
            <button class="product-box__button">
                <img src="../assets/images/icon-add-to-cart.svg">
                <span>Add to Cart</span>
            </button>
        </div>
        <p class="product-box__short-name">${product.category}</p>
        <p class="product-box__full-name">${product.name}</p>
        <p class="product-box__price">$${product.price.toFixed(2)}</p> 
    </div>
    `
});
document.querySelector('.grid').innerHTML = gridHTML;