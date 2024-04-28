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

    // function to retrieve data from showcart.php
    function getCart() {
        fetch('showcart.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayCart(data.data); // if data successfully retrieved, call function to display cart
            } else {
                console.error('Failed to fetch cart:', data.message); // if data not successfully retrieved, display error message in server
                document.getElementById('order-container').innerText = "No items to checkout."; // display error message to user
            }
        })
        .catch(error => console.error('Error fetching cart:', error)); // display error message in server
    }

    // function to display the cart to user
    function displayCart(cart) {
        const container = document.querySelector('.order-container');
        // loops through each item in the cart
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

            // join the item details together as one
            element.appendChild(quantity);
            element.appendChild(name);
            element.appendChild(price);

            // add the item onto the container
            container.appendChild(element);

        });
    }

    // function that gets total_price.php to calculate the total
    function getTotal() {
        fetch('total_price.php')
            .then(response => response.json())
            .then(data => {
              if (!data.error) {
                // If there is no error, display the total
                const totalContainer = document.querySelector('.total-price');

                const total = document.createElement('h2');
                total.textContent = "Total:";
                total.className = 'total';

                const totalPrice = document.createElement('h2');
                totalPrice.textContent = `RM${data.toFixed(2)}`; // displaying as a decimal number of 2 decimal places
                totalPrice.className = 'total-price-amount';

                totalContainer.appendChild(total);
                totalContainer.appendChild(totalPrice);
              } 
              else {
                // Handle error
                console.error(data.error);
              } 
            })
    .catch(error => console.error('Error:', value));
        
    }

    getAccountDetails();
    getCart();
    getTotal();

    var placeOrderForm = document.querySelector(".place-order-form");

    // Listen for form submission
    placeOrderForm.addEventListener("submit", function(e) {
      // Prevent the default form submission
      e.preventDefault();

      addOrder(placeOrderForm); 
      });

    // function that when the user checks out, is called to add the order into the database
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
          document.getElementById('error').innerText = data.message; // if failed, display error message to user
        }
      })
      .catch((error) => {
        // if failed, display error message to user
        console.error('Error:', error); 
        document.getElementById('error').innerText = "An unexpected error occurred. Please try again.";
      });
    }
});

