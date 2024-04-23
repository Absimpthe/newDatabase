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
    fetchOrders(tab);
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveTab('unfulfilled'); // Automatically fetches the orders too
});

function fetchOrders(status) {
    let url = `${status}_orders.php`;  // Dynamic URL based on order status
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayOrders(data.data, status);
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
}

function displayOrders(data, status) {
    let ordersContainer = document.getElementById(`${status}-ordersContainer`); // Dynamic container based on status

    if (!data.length) {
        ordersContainer.innerHTML = `<p>No ${status} orders found.</p>`;
        return;
    }

    ordersContainer.innerHTML = '';

    data.forEach(order => {
        let itemsHTML = order.Items.map(item => `
            <li>${item.ItemCode} - Quantity: ${item.ItemQuantity}, Subtotal: $${item.SubtotalPrice}</li>
        `).join('');

        let metadataHTML = `
            <div class="order-metadata">
                <h2>Order ID: ${order.OrderID}</h2>
                <p>Date: ${order.Date}</p>
                <p>Total Price: $${order.TotalPrice}</p>
                <p>Order Status: ${order.OrderStatus}</p>
                <p>Payment Status: ${order.PaymentStatus}</p>
            </div>
        `;

        let itemsContainerHTML = `
            <div class="order-items">
                <ul>${itemsHTML}</ul>
            </div>
        `;

        let orderHTML = `${metadataHTML}${itemsContainerHTML}`;
        if (status === "unfulfilled") {
            orderHTML += `<div class="button-container"><button class="accept-btn">Accept Order</button></div>`;
        }
        if (status === "accepted") {
            orderHTML += `<div class="button-container"><button class="mark-as-delivered-btn">Mark as Delivered</button></div>`
        }

        let orderContainer = document.createElement('div');
        orderContainer.className = 'order-container';
        orderContainer.innerHTML = orderHTML;
        ordersContainer.appendChild(orderContainer);

        if (status === "unfulfilled") {
            const acceptBtn = orderContainer.querySelector('.accept-btn');
            acceptBtn.addEventListener('click', () => handleAcceptOrder(order.OrderID));
        }
    });
}

function handleAcceptOrder(orderID) {
    // Update order status to "In Progress"
    const updateData = { orderID: orderID, newStatus: 'In Progress' };

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
            // Remove the order from the UI
            window.location.reload();
            fetchOrders();
        } else {
            console.error('Failed to update order status:', data.message);
        }
    })
    .catch(error => {
        console.error('Error updating order status:', error);
        // Optionally, handle the error or inform the user
    });
}