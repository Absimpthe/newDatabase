document.addEventListener("DOMContentLoaded", function() {

    const saveButton = document.getElementById('save-btn');

    // Function for when user clicks save changes button
    saveButton.addEventListener('click', function() {
        const items = []; 
        document.querySelectorAll('.menu-container').forEach(container => { // loops through each container in the page
            container.querySelectorAll('.menu-item').forEach(item => { // loops through each item in the database
                var itemCode = item.querySelector('.item-code').value;
                var itemName = item.querySelector('.item-name').value;
                var price = item.querySelector('.item-price').value;
                var availability = item.querySelector('.stock').value;

                items.push({
                    itemCode: itemCode,
                    itemName: itemName,
                    price: price,
                    availability: availability
                });
            });
        });
        console.log(JSON.stringify(items));
        if (items.length > 0) {
            fetch('../admin/update_items.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: items })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful');
                alert('All items updated successfully!');
            })
            .catch(error => {
                console.error('Error updating items:', error);
                alert('Failed to update items.');
            });
        } else {
            alert('No items to update.');
        }
    });
});