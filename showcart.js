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
        cartTableBody.innerHTML = ''; // Clear the current cart display
    
        Object.keys(cart).forEach(itemCode => {
            const row = document.createElement('tr');
            
            // Create cell for item code
            const itemCodeCell = document.createElement('td');
            itemCodeCell.textContent = itemCode;
            row.appendChild(itemCodeCell);
    
            // Create cell for item name
            const itemNameCell = document.createElement('td');
            itemNameCell.textContent = cart[itemCode].name; 
            row.appendChild(itemNameCell);
    
            // Create cell for quantity
            const quantityCell = document.createElement('td');
            quantityCell.textContent = cart[itemCode].quantity; 
            row.appendChild(quantityCell);
    
            // Create cell for price
            const priceCell = document.createElement('td');
            priceCell.textContent = cart[itemCode].subtotal.toFixed(2);
            row.appendChild(priceCell);
    
            // Append the row to the table body
            cartTableBody.appendChild(row);
        });
    }
    
    fetchCart();
});
