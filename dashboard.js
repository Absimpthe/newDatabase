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
    
    // Since data is the array directly, check its length
    if (!data.length) {
        ordersContainer.innerHTML = '<p>No confirmed orders found.</p>';
        return;
    }

    // Clear previous contents
    ordersContainer.innerHTML = '';

    data.forEach(order => {
        let itemsHTML = order.Items.map(item => `
            <li>${item.ItemCode} - Quantity: ${item.ItemQuantity}, Subtotal: $${item.SubtotalPrice}</li>
        `).join('');

        let orderHTML = `
            <div class="order">
                <h2>Order ID: ${order.OrderID}</h2>
                <p>Date: ${order.Date}</p>
                <p>Total Price: $${order.TotalPrice}</p>
                <p>Order Status: ${order.OrderStatus}</p>
                <p>Payment Status: ${order.PaymentStatus}</p>
                <div class="items">
                    <h3>Items:</h3>
                    <ul>${itemsHTML}</ul>
                </div>
            </div>
        `;

        ordersContainer.innerHTML += orderHTML;
    });
}

