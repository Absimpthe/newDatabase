document.addEventListener('DOMContentLoaded', function() {
    function fetchOrders() {
        fetch('show_orders.php', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateOrderDisplay(data.data); // Pass the entire data array to the function
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    function updateOrderDisplay(orders) {
        const ordersContainer = document.getElementById('left-column');

        // Clear previous contents
        ordersContainer.innerHTML = '';

        // Check if there are orders and update the DOM
        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p>No confirmed orders found.</p>';
            return;
        }

        orders.forEach(order => {
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
                    <ul>${itemsHTML}</ul>
                </div>
            `;

            ordersContainer.innerHTML += orderHTML;
        }); 
    }    
    
    fetchOrders();
});
