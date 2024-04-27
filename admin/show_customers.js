document.addEventListener('DOMContentLoaded', function() {
    // function to get all customer details
    function fetchCustomers() {
        fetch('../show_customers.php', { method: 'GET' }) 
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateCustDisplay(data.data);
            } else {
                // if no registered customers found, display message on webpage
                const custContainer = document.getElementById('customer-container');
                custContainer.innerHTML = '';
                custContainer.style.marginLeft = '20px';
                custContainer.innerHTML = '<p>No registered customers found.</p>';
                return;
            }
        })
        .catch(error => console.error('Error fetching customers:', error));
    }

    // function to display customer details
    function updateCustDisplay(customers) {
        const customerContainer = document.getElementById('customer-container');
        customerContainer.innerHTML = '';  // Clear previous contents
    
        customers.forEach(customer => { // loops through each customer in the database
            const customerDetails = document.createElement('div');
            customerDetails.className = 'customer-details'; 
    
            // Create HTML elements for each customer attribute
            // Display user ID
            const userId = document.createElement('p');
            userId.textContent = `User ID: ${customer.UserID}`;
            customerDetails.appendChild(userId);
    
            // Display username
            const username = document.createElement('p');
            username.textContent = `Username: ${customer.Username}`;
            customerDetails.appendChild(username);
    
            // Display home address
            const address = document.createElement('p');
            address.textContent = `Address: ${customer.Address}`;
            customerDetails.appendChild(address);
    
            // Display email address
            if (customer.EmailAddress) {  // Check if EmailAddress is not null
                const email = document.createElement('p');
                email.textContent = `Email: ${customer.EmailAddress}`;
                customerDetails.appendChild(email);
            }
    
            // Display phone number
            const phone = document.createElement('p');
            phone.textContent = `Phone: ${customer.PhoneNumber}`;
            customerDetails.appendChild(phone);
    
            // Append the customer details to the main container
            customerContainer.appendChild(customerDetails);
        });
    }    
    
    fetchCustomers();
});