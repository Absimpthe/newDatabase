document.addEventListener('DOMContentLoaded', function() {
    function getAccountDetails() {
    fetch('account_details.php')
            .then(response => response.json())
            .then(data => {
              if (!data.error) {
                // If there is no error, display the user details
                document.getElementById('address').value = data.Address;
                document.getElementById('phone-no').value = data.PhoneNumber;
              } 
              else {
                // Handle error (e.g., user not found)
                console.error(data.error);
              } 
            })
    .catch(error => console.error('Error:', value));
    }

    function getCart() {
        fetch('showcart.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayCart(data.data);
            } else {
                console.error('Failed to fetch cart:', data.message);
            }
        })
        .catch(error => console.error('Error fetching cart:', error));
    }

    function displayCart(cart) {
        const container = document.querySelector('.order-container');
        Object.keys(cart).forEach(itemCode => {
            
            const element = document.createElement('div');
            element.className = 'item';

            const name = document.createElement('h3');
            name.textContent = cart[itemCode].name;
            element.className = 'item-name';

            const quantity = document.createElement('p');
            quantity.textContent = `${cart[itemCode].quantity}x`;
            element.className = 'item-quantity';

            const price = document.createElement('p');
            price.textContent = `RM${cart[itemCode].subtotal.toFixed(2)}`;
            element.className = 'item-price';

            const divider = document.createElement('hr');
           

            element.appendChild(quantity);
            element.appendChild(name);
            element.appendChild(price);
            element.appendChild(divider);

            container.appendChild(element);

        });
    }

    getAccountDetails();
    getCart();
});