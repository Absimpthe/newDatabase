document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const cartContents = document.getElementById('cartContents');
    cartContents.innerHTML = ''; // Clear previous contents

    if (Object.keys(cart).length === 0) {
        cartContents.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        Object.keys(cart).forEach(itemCode => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <p>Item Code: ${itemCode}</p>
                <p>Quantity: ${cart[itemCode]}</p>
                <button onclick="updateQuantity('${itemCode}', -1)">-</button>
                <button onclick="updateQuantity('${itemCode}', 1)">+</button>
                <button onclick="removeItem('${itemCode}')">Remove</button>
            `;
            cartContents.appendChild(itemDiv);
        });
    }
}

function updateQuantity(itemCode, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[itemCode]) {
        cart[itemCode] += change;
        if (cart[itemCode] <= 0) {
            delete cart[itemCode]; // Remove the item if quantity is 0 or less
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Refresh the display
    }
}

function removeItem(itemCode) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    delete cart[itemCode];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the display
}

function proceedToCheckout() {
    // This function can redirect to a checkout process or simply finalize the order
    console.log('Proceeding to checkout...');
    // Example: window.location.href = 'checkout.html';
}
