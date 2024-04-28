document.getElementById('unfulfilled-tab').addEventListener('click', function() {
    setActiveTab('unfulfilled');
});

document.getElementById('accepted-tab').addEventListener('click', function() {
    setActiveTab('accepted');
});

// function to display the correct tab
function setActiveTab(tab) {
    var unfulfilledContent = document.getElementById('unfulfilled-orders');
    var acceptedContent = document.getElementById('accepted-orders');
    var unfulfilledTab = document.getElementById('unfulfilled-tab');
    var acceptedTab = document.getElementById('accepted-tab');

    if (tab === 'unfulfilled') { // display unfulfilled orders tab
        unfulfilledContent.style.display = 'block';
        acceptedContent.style.display = 'none';
        unfulfilledTab.classList.add('active');
        acceptedTab.classList.remove('active');
    } else { // display accepted orders tab
        acceptedContent.style.display = 'block';
        unfulfilledContent.style.display = 'none';
        acceptedTab.classList.add('active');
        unfulfilledTab.classList.remove('active');
    }
    fetchOrders(tab);
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveTab('unfulfilled'); // Automatically fetches the orders too
});

// function to get orders from the database
function fetchOrders(status) {
    let url = `${status}_orders.php`;  // Dynamic URL based on order status
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayOrders(data.data, status); // if successfully retrieved orders, call function to display orders
            } else {
                let orderContainer = document.getElementById(`${status}-ordersContainer`);
                orderContainer.innerHTML = '';
                // if error in retrieving errors, display message to user
                orderContainer.innerHTML = `<p>No ${status} orders found. Please come back again later.</p>`;
                return;
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
}

// function to display all orders to the user
function displayOrders(data, status) {
    let ordersContainer = document.getElementById(`${status}-ordersContainer`); // Dynamic container based on status

    ordersContainer.innerHTML = '';

    // loops through each order to display them
    data.forEach(order => {
        let itemsHTML = order.Items.map(item => `
            <li>${item.ItemCode} - Quantity: ${item.ItemQuantity}, Subtotal: $${item.SubtotalPrice}</li>
        `).join('');

        // order details are here
        let metadataHTML = `
            <div class="order-metadata">
                <h3>Order ID: ${order.OrderID}</h3>
                <p>Date: ${order.Date}</p>
                <p>Total Price: $${order.TotalPrice}</p>
                <p>Order Status: ${order.OrderStatus}</p>
                <p>Payment Status: ${order.PaymentStatus}</p>
                <p>Customer Address: ${order.Address}</p>
            </div>
        `;

        // add the order items here
        let itemsContainerHTML = `
            <div class="order-items">
                <h3>Items:</h3>
                <ul>${itemsHTML}</ul>
            </div>
        `;

        let orderHTML = `${metadataHTML}${itemsContainerHTML}`;
        // dynamically create buttons according to the tab opened
        if (status === "unfulfilled") {
            orderHTML += `<div class="button-container"><button class="accept-btn">Accept Order</button></div>`;
        }
        if (status === "accepted") {
            orderHTML += `<div class="button-container"><button class="mark-as-delivered-btn">Mark as Delivered</button></div>`
        }

        // create new element to display the orders
        let orderContainer = document.createElement('div');
        orderContainer.className = 'order-container';
        orderContainer.innerHTML = orderHTML; // add the order details onto the element
        ordersContainer.appendChild(orderContainer);

        // depending on the tab, add the buttons onto the element and handle them 
        if (status === "unfulfilled") {
            const acceptBtn = orderContainer.querySelector('.accept-btn');
            acceptBtn.addEventListener('click', () => handleAcceptOrder(order.OrderID));
        }
        if (status === "accepted") {
            const deliveredBtn = orderContainer.querySelector('.mark-as-delivered-btn');
            deliveredBtn.addEventListener('click', () => handleDeliveredOrder(order.OrderID));
        }
    });
}

// function to handle orders that have been delivered
function handleDeliveredOrder(orderID) {
    const update_data = {orderID: orderID, newStatus: 'Completed'};
    // call update_order_status.php
    fetch('update_order_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update_data), // send the data needed to update the order
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') { // order has been successfully updated in the database
            console.log('Order status updated successfully:', orderID);
            // Remove the order from the UI
            window.location.reload();
            fetchOrders();
        } else {
            console.error('Failed to update order status:', data.message); // if error in updating, display error message in server
        }
    })
    .catch(error => {
        console.error('Error updating order status:', error); // if error in updating, display error message in server
    });
}

function handleAcceptOrder(orderID, driverID) {
    // First, update the order status to "In Progress"
    const updateData = {orderID: orderID, newStatus: 'In Progress'};

    fetch('update_order_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Order status updated successfully:', orderID);
            // Assuming status update is successful, proceed to add to deliveries
            addOrderToDeliveries(orderID, driverID);
        } else {
            console.error('Failed to update order status:', data.message);
        }
    })
    .catch(error => {
        console.error('Error updating order status:', error);
    });
}

function addOrderToDeliveries(orderID, driverID) {
    // Create a FormData object to send the POST data for adding to deliveries
    var formData = new FormData();
    formData.append('action', 'acceptOrder');
    formData.append('orderID', orderID);
    formData.append('driverID', driverID);

    // Make a second fetch request to add the order to deliveries
    fetch('acceptingorders.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log(data.message);
            alert('Order accepted and added to deliveries successfully!');
            window.location.reload();  // Reload the page or fetch orders to update UI
        } else {
            console.error('Failed to add order to deliveries:', data.message);
        }
    })
    .catch(error => {
        console.error('Error adding order to deliveries:', error);
    });
}
