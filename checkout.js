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

            const quantity = document.createElement('p');
            quantity.textContent = `${cart[itemCode].quantity}x`;
            quantity.className = 'item-quantity';

            const name = document.createElement('h3');
            name.textContent = cart[itemCode].name;
            name.className = 'item-name';

            const price = document.createElement('h3');
            price.textContent = `RM${cart[itemCode].subtotal.toFixed(2)}`;
            price.className = 'item-price';

            const divider = document.createElement('hr');
            divider.className = 'divider';

            element.appendChild(quantity);
            element.appendChild(name);
            element.appendChild(price);
            //container.appendChild(divider);

            container.appendChild(element);

        });
    }

    function getTotal() {
        fetch('total_price.php')
            .then(response => response.json())
            .then(data => {
              if (!data.error) {
                // If there is no error, display the user details
                const totalContainer = document.querySelector('.total-price');

                const total = document.createElement('h2');
                total.textContent = "Total:";
                total.className = 'total';

                const totalPrice = document.createElement('h2');
                totalPrice.textContent = `RM${data.toFixed(2)}`;
                totalPrice.className = 'total-price-amount';

                totalContainer.appendChild(total);
                totalContainer.appendChild(totalPrice);
              } 
              else {
                // Handle error (e.g., user not found)
                console.error(data.error);
              } 
            })
    .catch(error => console.error('Error:', value));
        
    }

    getAccountDetails();
    getCart();
    getTotal();
});

var placeOrderForm = document.querySelector(".place-order-form");

// Listen for form submission
placeOrderForm.addEventListener("submit", function(e) {
  // Prevent the default form submission
  e.preventDefault();

  addOrder(placeOrderForm); 
  });

function addOrder(form) {
  var formData = new FormData(form);

  fetch('checkout.php', {
    method: "POST",
    body: formData
  })
  .then(response => {
    console.log("Received response", response);
    return response.json();
  })
  .then (data => {
    console.log(data);
    if (data.status === "success") {
      window.location.href="order_received.html";
      // order succesfully added to database
    }
    else {
      document.getElementById('error').innerText = data.message;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    document.getElementById('error').innerText = "An unexpected error occurred. Please try again.";
    // Handle errors
  });
}