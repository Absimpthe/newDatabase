document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element has the 'add-to-cart-btn' class
        if (event.target && event.target.matches('.add-to-cart-btn')) {
            const itemCode = event.target.getAttribute('data-itemcode');
            const itemName = event.target.getAttribute('data-itemname');
            const itemPrice = parseFloat(event.target.getAttribute('data-itemprice')); // Convert price to a float
            addToCart(itemCode, itemName, itemPrice);
            var warningMessage = document.getElementById('pop-up');
            warningMessage.classList.remove('hidden');
            warningMessage.classList.add('visible');

            setTimeout(function() {
                warningMessage.classList.remove('visible');
                warningMessage.classList.add('hidden');
            }, 3000); // Message will hide after 3000 milliseconds (3 seconds)
        }
    });
});

// function to add items to the cart
function addToCart(itemCode, itemName, itemPrice) {
    // send data to cartphp.php
    fetch('cartphp.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            itemCode: itemCode, 
            itemName: itemName, 
            itemPrice: itemPrice,
            increment: 1 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Item added to cart:', itemCode, itemName, itemPrice); // if item successfully added to cart, inform server
        } else {
            console.error('Failed to add item:', data.message); // if error occurred, send error message to server
        }
    })
    .catch(error => console.error('Error adding item:', error)); // if error occurred, send error message to server
}
