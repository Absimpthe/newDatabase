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
        const cartTableBody = document.querySelector('#cartTable tbody');
        // Clear any existing cart item entries but keep the total row
        while (cartTableBody.firstChild && cartTableBody.firstChild.id !== 'totalRow') {
            cartTableBody.removeChild(cartTableBody.firstChild);
        }
        let total = 0; // Initialize total amount
    
        Object.keys(cart).forEach(itemCode => {
            const row = document.createElement('tr');
            
            const itemCodeCell = document.createElement('td');
            itemCodeCell.textContent = itemCode;
            row.appendChild(itemCodeCell);
    
            const itemNameCell = document.createElement('td');
            itemNameCell.textContent = cart[itemCode].name;
            row.appendChild(itemNameCell);
    
            const quantityCell = document.createElement('td');
            quantityCell.textContent = cart[itemCode].quantity;
            row.appendChild(quantityCell);
    
            const priceCell = document.createElement('td');
            priceCell.textContent = `RM${cart[itemCode].subtotal.toFixed(2)}`;
            row.appendChild(priceCell);
    
            cartTableBody.insertBefore(row, cartTableBody.querySelector('#totalRow')); // Insert before the total row
            total += parseFloat(cart[itemCode].subtotal);
        });
    
        // Update the total price in the existing 'totalRow'
        const totalPriceCell = document.querySelector('#totalPrice');
        totalPriceCell.textContent = `RM${total.toFixed(2)}`;
        totalPriceCell.colSpan = 3;
        totalPriceCell.style.textAlign = 'center';
    }
    
    fetchCart();
});
