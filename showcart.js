document.addEventListener('DOMContentLoaded', function() {
    function fetchCart() {
        fetch('showcart.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateCartDisplay(data.data);
            } else {
                console.error('Failed to fetch cart:', data.message);
            }
        })
        .catch(error => console.error('Error fetching cart:', error));
    }

    function updateCartDisplay(cart) {
        const cartContainer = document.querySelector('#cartContainer');
        cartContainer.innerHTML = ''; // Clear the current cart display

        Object.keys(cart).forEach(itemCode => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `Item Code: ${itemCode}, Quantity: ${cart[itemCode]}`;
            cartContainer.appendChild(itemElement);
        });
    }
    fetchCart();
});
