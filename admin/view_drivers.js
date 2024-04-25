document.addEventListener('DOMContentLoaded', function() {
    function fetchDrivers() {
        fetch('show_drivers.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateDriverDisplay(data.data);
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

    function updateDriverDisplay(drivers) {
        const driverContainer = document.getElementById('driver-container');
        driverContainer.innerHTML = '';  // Clear previous contents
    
        drivers.forEach(driver => {
            const driverDetails = document.createElement('div');
            driverDetails.className = 'driver-details-container'; // This is the container for each driver
    
            const metadataHTML = `
                <div class="driver-metadata">
                    <h2>Driver ID: ${driver.UserID}</h2>
                    <p>Username: ${driver.Username}</p>
                    <p>Password: ${driver.UserPassword}</p>
                    <p>Address: ${driver.Address}</p>
                    <p>Email Address: ${driver.EmailAddress}</p>
                    <p>Phone Number: ${driver.PhoneNumber}</p>
                    <p>Car Plate: ${driver.Details.CarPlateNo}</p>
                    <p>Rating: ${driver.Details.DriverRating}</p>
                </div>
            `;
    
            
            // Set the innerHTML of orderContainer
            driverDetails.innerHTML = metadataHTML;
            driverContainer.appendChild(driverDetails);
        }); 
    }
    
    fetchDrivers();
});