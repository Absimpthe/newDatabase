document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the body or a more specific parent that exists on page load
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element has the 'add-to-cart-btn' class
        if (event.target && event.target.matches('.add-to-cart-btn')) {
            const itemCode = event.target.getAttribute('data-itemcode');
            const itemName = event.target.getAttribute('data-itemname');
            const itemPrice = parseFloat(event.target.getAttribute('data-itemprice')); // Convert price to a float
            addToCart(itemCode, itemName, itemPrice);
        }
    });
});

function addToCart(itemCode, itemName, itemPrice) {
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
            console.log('Item added to cart:', itemCode, itemName, itemPrice);
        } else {
            console.error('Failed to add item:', data.message);
        }
    })
    .catch(error => console.error('Error adding item:', error));
}
