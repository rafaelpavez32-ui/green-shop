// script.js

// JavaScript functionality for the GreenShop website

// Shopping Cart Functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Code to update the cart display
    console.log('Cart updated:', cart);
}

// Product Filtering Functionality
const products = [/* array of product objects */];

function filterProducts(category) {
    const filteredProducts = products.filter((product) => product.category === category);
    updateProductUI(filteredProducts);
}

function updateProductUI(productList) {
    // Code to update the product display
    console.log('Products updated:', productList);
}

// Form Validation Functionality
function validateForm(form) {
    // Basic validation rules
    const isValid = form.checkValidity();
    if (!isValid) {
        console.error('Form is invalid');
    }
    return isValid;
}

// Event Listener for form submission
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm(event.target)) {
        // Submit form logic here
    }
});

// Event Listeners for products
document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const product = products.find((p) => p.id === productId);
        addToCart(product);
    });
});

// Event listener for filtering
document.querySelector('#filter').addEventListener('change', (event) => {
    filterProducts(event.target.value);
});

