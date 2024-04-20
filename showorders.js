document.addEventListener('DOMContentLoaded', function() {
    function fetchOrders() {
        fetch('show_orders.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateOrderDisplay(data.data);
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    function updateOrderDisplay(orders) {
        const ordersWrapper = document.getElementById('orders-wrapper');
        ordersWrapper.innerHTML = '';  // Clear previous contents
    
        if (orders.length === 0) {
            ordersWrapper.innerHTML = '<p>No confirmed orders found.</p>';
            return;
        }
    
        orders.forEach(order => {
            const orderContainer = document.createElement('div');
            orderContainer.className = 'order-container'; // This is the container for each order
    
            const metadataHTML = `
                <div class="order-metadata">
                    <h2>Order ID: ${order.OrderID}</h2>
                    <p>Date: ${order.Date}</p>
                    <p>Total Price: $${order.TotalPrice}</p>
                    <p>Order Status: ${order.OrderStatus}</p>
                    <p>Payment Status: ${order.PaymentStatus}</p>
                </div>
            `;
    
            const itemsHTML = order.Items.map(item => `
                <li>${item.ItemCode} - Quantity: ${item.ItemQuantity}, Subtotal: $${item.SubtotalPrice}</li>
            `).join('');
    
            const itemsContainerHTML = `
                <div class="order-items">
                    <h3>Items:</h3>
                    <ul>${itemsHTML}</ul>
                </div>
            `;
    
            // Set the innerHTML of orderContainer
            orderContainer.innerHTML = metadataHTML + itemsContainerHTML;
            // Append each orderContainer to the ordersWrapper
            ordersWrapper.appendChild(orderContainer);
        }); 
    }
    
    fetchOrders();
});
