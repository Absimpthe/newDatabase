document.addEventListener('DOMContentLoaded', function() {
    // Function to check whether there are any orders in the database
    function fetchOrders() {
        fetch('show_all_orders.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateOrderDisplay(data.data); // if there are orders, call function to display 
            } else {
                const orderWrapper = document.getElementById('orders-wrapper');
                orderWrapper.innerHTML = '';
                orderWrapper.style.marginLeft = '20px';
                orderWrapper.innerHTML = '<p>No orders found.</p>'; // message to show user when no orders found
                return;
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    // Function to display orders
    function updateOrderDisplay(orders) {
        const ordersWrapper = document.getElementById('orders-wrapper');
        ordersWrapper.innerHTML = '';  // Clear previous contents
    
        orders.forEach(order => { // loop to display each order
            const orderContainer = document.createElement('div');
            orderContainer.className = 'order-container'; // This is the container for each order
    
            // Order details from orders table in the database
            const metadataHTML = `
                <div class="order-metadata">
                    <h2>Order ID: ${order.OrderID}</h2>
                    <p>Date: ${order.Date}</p>
                    <p>Total Price: $${order.TotalPrice}</p>
                    <p>Order Status: ${order.OrderStatus}</p>
                    <p>Payment Status: ${order.PaymentStatus}</p>
                </div>
            `;
    
            // For each order, get the items in the order
            const itemsHTML = order.Items.map(item => `
                <li>${item.ItemCode} - Quantity: ${item.ItemQuantity}, Subtotal: $${item.SubtotalPrice}</li>
            `).join('');
    
            // Join them in a list
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