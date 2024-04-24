document.addEventListener("DOMContentLoaded", function() {

    const saveButton = document.getElementById('save-btn');

    saveButton.addEventListener('click', function() {
        const items = [];
        document.querySelectorAll('.menu-container').forEach(container => {
            const itemCode = container.getElementById('#item-code');
            const itemName = container.querySelector('#item-name').value;
            const price = container.querySelector('#item-price').value;
            const availability = container.querySelector('#stock').value;

            items.push({
                itemCode: itemCode,
                itemName: itemName,
                price: price,
                availability: availability
            });
        });

        fetch('/admin/update_items.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: items })
        })
        .then(response => response.json())
        .then(data => {
            alert('Update successful!');
        })
        .catch(error => {
            console.error('Error updating items:', error);
            alert('Failed to update items.');
        });
    });

});