document.addEventListener('DOMContentLoaded', function() {
    function fetchDrivers() {
        fetch('show_drivers.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateCustDisplay(data.data);
            } else {
                const driverContainer = document.getElementById('driver-container');
                driverContainer.innerHTML = '';
                driverContainer.style.marginLeft = '20px';
                driverContainer.innerHTML = '<p>No orders yet. Place your first order now!</p>';
                return;
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    function updateCustDisplay(customers) {
        const customerContainer = document.getElementById('customer-container');
        customerContainer.innerHTML = '';  // Clear previous contents
    
        customers.forEach(customer => {
            const customerDetails = document.createElement('div');
            customerDetails.className = 'customer-details'; 
    
            // add customer details here

            customerContainer.appendChild(customerDetails);
        }); 
    }
    
    fetchDrivers();
});