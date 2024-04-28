document.addEventListener('DOMContentLoaded', function() {
    // function to get orders
    function fetchOrders() {
        fetch('show_orders.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateOrderDisplay(data.data); // if data successfully retrieved, call function to display orders
            } else {
                // if no orders found, display message to user
                const orderWrapper = document.getElementById('orders-wrapper');
                orderWrapper.innerHTML = '';
                orderWrapper.style.marginLeft = '20px';
                orderWrapper.innerHTML = '<p>No orders yet. Place your first order now!</p>';
                return;
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    // function to display the orders
    function updateOrderDisplay(orders) {
        const ordersWrapper = document.getElementById('orders-wrapper');
        ordersWrapper.innerHTML = '';  // Clear previous contents
    
        // loops through each order made by user
        orders.forEach(order => {
            const orderContainer = document.createElement('div');
            orderContainer.className = 'order-container'; // This is the container for each order
    
            // the order details 
            const metadataHTML = `
                <div class="order-metadata">
                    <h2>Order ID: ${order.OrderID}</h2>
                    <p>Date: ${order.Date}</p>
                    <p>Total Price: $${order.TotalPrice}</p>
                    <p>Order Status: ${order.OrderStatus}</p>
                    <p>Payment Status: ${order.PaymentStatus}</p>
                </div>
            `;
    
            // the order items in the order
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