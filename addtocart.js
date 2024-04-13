document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the body or a more specific parent that exists on page load
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element has the 'add-to-cart-btn' class
        if (event.target && event.target.matches('.add-to-cart-btn')) {
            const itemCode = event.target.getAttribute('data-itemcode');
            addToCart(itemCode);
        }
    });
});

function addToCart(itemCode) {
    fetch('cartphp.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemCode: itemCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Item added to cart:', itemCode);
        } else {
            console.error('Failed to add item:', data.message);
        }
    })
    .catch(error => console.error('Error adding item:', error));
}
