document.getElementById('unfulfilled-tab').addEventListener('click', function() {
    setActiveTab('unfulfilled');
});

document.getElementById('accepted-tab').addEventListener('click', function() {
    setActiveTab('accepted');
});

function setActiveTab(tab) {
    var unfulfilledContent = document.getElementById('unfulfilled-orders');
    var acceptedContent = document.getElementById('accepted-orders');
    var unfulfilledTab = document.getElementById('unfulfilled-tab');
    var acceptedTab = document.getElementById('accepted-tab');

    if (tab === 'unfulfilled') {
        unfulfilledContent.style.display = 'block';
        acceptedContent.style.display = 'none';
        unfulfilledTab.classList.add('active');
        acceptedTab.classList.remove('active');
    } else {
        acceptedContent.style.display = 'block';
        unfulfilledContent.style.display = 'none';
        acceptedTab.classList.add('active');
        unfulfilledTab.classList.remove('active');
    }
}

// Initially show unfulfilled orders
setActiveTab('unfulfilled');

document.addEventListener('DOMContentLoaded', function() {
    fetchOrders();
});

function fetchOrders() {
    fetch('unfulfilled_orders.php')  // Replace with the actual URL of your PHP script
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayOrders(data.data);
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
}

function displayOrders(data) {
    const ordersContainer = document.getElementById('ordersContainer');

    // Check if the data array is empty
    if (!data.length) {
        ordersContainer.innerHTML = '<p>No confirmed orders found.</p>';
        return;
    }

    // Clear previous contents
    ordersContainer.innerHTML = '';

    data.forEach(order => {
        // Generate HTML for items
        let itemsHTML = order.Items.map(item => `
            <li>${item.ItemCode} - Quantity: ${item.ItemQuantity}, Subtotal: $${item.SubtotalPrice}</li>
        `).join('');

        // Create container for order metadata
        let metadataHTML = `
            <div class="order-metadata">
                <h2>Order ID: ${order.OrderID}</h2>
                <p>Date: ${order.Date}</p>
                <p>Total Price: $${order.TotalPrice}</p>
                <p>Order Status: ${order.OrderStatus}</p>
                <p>Payment Status: ${order.PaymentStatus}</p>
            </div>
        `;

        // Create container for order items
        let itemsContainerHTML = `
            <div class="order-items">
                <h2>Items:</h2>
                <ul>${itemsHTML}</ul>
            </div>
        `;

        // Combine metadata and items in the main order container
        let orderHTML = `
            <div class="order">
                ${metadataHTML}
                ${itemsContainerHTML}
                <div class="button-container"><button class="accept-btn">Accept Order</button></div>
            </div>
        `;

        // Create a new container for each order
        let orderContainer = document.createElement('div');
        orderContainer.className = 'order-container';
        orderContainer.innerHTML = orderHTML;

        // Append the new order container to the main container
        ordersContainer.appendChild(orderContainer);
    });
}

