document.addEventListener('DOMContentLoaded', function() {
    // Function to get driver details from database
    function fetchDrivers() {
        fetch('show_drivers.php', { method: 'GET' }) // Get data from PHP side
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateDriverDisplay(data.data);
            } else {
                // if no drivers found, display message on webpage
                const driverContainer = document.getElementById('driver-container');
                driverContainer.innerHTML = '';
                driverContainer.style.marginLeft = '20px';
                driverContainer.innerHTML = '<p>No drivers yet.</p>';
                return;
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    // Function to dynamically display the drivers 
    function updateDriverDisplay(drivers) {
        const driverContainer = document.getElementById('driver-container'); // get the element that will display all drivers
        driverContainer.innerHTML = '';  // Clear previous contents
    
        drivers.forEach(driver => {
            const driverDetails = document.createElement('div');
            driverDetails.className = 'driver-details-container'; // This is the container for each driver
    
            // details for each driver
            const metadataHTML = `
                <div class="driver-metadata">
                    <h2>Driver ID: ${driver.UserID}</h2>
                    <p>Username: ${driver.Username}</p>
                    <p>Password: ${driver.UserPassword}</p>
                    <p>Address: ${driver.Address}</p>
                    <p>Email Address: ${driver.EmailAddress}</p>
                    <p>Phone Number: ${driver.PhoneNumber}</p>
                    <p>Car Plate: ${driver.Details.CarPlateNo}</p>  
                </div>
            `;
    
            
            // Set the innerHTML of orderContainer
            driverDetails.innerHTML = metadataHTML;
            driverContainer.appendChild(driverDetails);
        }); 
    }
    
    fetchDrivers();
});