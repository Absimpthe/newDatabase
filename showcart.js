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
                return false;
            }
        })
        .catch(error => console.error('Error fetching cart:', error));
        return true;
    }

    function updateCartDisplay(cart) {
        const cartTableBody = document.querySelector('#cartTable tbody');
        while (cartTableBody.firstChild && cartTableBody.firstChild.id !== 'totalRow') {
            cartTableBody.removeChild(cartTableBody.firstChild);
        }
        let total = 0;

        Object.keys(cart).forEach(itemCode => {
            const row = document.createElement('tr');
            
            // Create a cell for item code and remove button
            const itemCodeCell = document.createElement('td');
            itemCodeCell.classList.add('item-code-cell'); // Apply the CSS class for styling
            itemCodeCell.textContent = itemCode;
            
            // Create remove button with icon
            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-remove', 'btn-icon');
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-trash-alt');
            removeButton.appendChild(icon);
            removeButton.onclick = () => removeItemFromCart(itemCode);

            // Append the button next to the item code
            itemCodeCell.appendChild(removeButton);
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

            cartTableBody.insertBefore(row, cartTableBody.querySelector('#totalRow'));
            total += parseFloat(cart[itemCode].subtotal);
        });

        const totalPriceCell = document.querySelector('#totalPrice');
        totalPriceCell.textContent = `RM${total.toFixed(2)}`;
        totalPriceCell.colSpan = 3;
        totalPriceCell.style.textAlign = 'center';
    }

    function removeItemFromCart(itemCode) {
        fetch(`removefromcart.php?itemCode=${itemCode}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
                fetchCart(); // Refetch the cart to update the display
            } else {
                console.error('Failed to remove item:', data.message);
            }
        })
        .catch(error => console.error('Error removing item:', error));
    }
    
    var hasCart = fetchCart();
    document.getElementById('back-to-menu').addEventListener('click', function() {
        window.location.href = "menu.html"; 
    });
    
    document.getElementById('checkout').addEventListener('click', function() {
        if (hasCart) {
            window.location.href = "checkout.html"; 
        }
        else {
            document.getElementById('cart-error').innerText = "No items found in cart. Go add some!";
        }
    });    
});
