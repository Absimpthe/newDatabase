document.addEventListener('DOMContentLoaded', function() {
    function fetchOrders() {
        fetch('show_orders.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                data.data.orders.forEach(order => {
                    orderID = order.OrderID;
                    updateOrderDisplay(order);
                });
                
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    function updateOrderDisplay(order) {
        const leftContainer = document.querySelector('#left-column');

        const column = document.createElement('div');
        column.className = 'order-details';

        const orderIDTitle = document.createElement('h2');
        orderIDTitle.textContent = 'Order ID';
        const orderID = document.createElement('p');
        orderID.textContent = order.OrderID;
        column.appendChild(orderIDTitle);
        column.appendChild(orderID);

        const totalPriceTitle = document.createElement('h2');
        totalPriceTitle.textContent = 'Total Price';
        const totalPrice = document.createElement('p');
        totalPrice.textContent = `RM${order.TotalPrice}`;
        column.appendChild(totalPriceTitle);
        column.appendChild(totalPrice);

        const dateTitle = document.createElement('h2');
        dateTitle.textContent = 'Date';
        const date = document.createElement('p');
        date.textContent = order.Date; 
        column.appendChild(dateTitle);
        column.appendChild(date);

        const orderStatusTitle = document.createElement('h2');
        orderStatusTitle.textContent = 'Order Status';
        const orderStatus = document.createElement('p');
        orderStatus.textContent = order.OrderStatus;
        column.appendChild(orderStatusTitle);
        column.appendChild(orderStatus);

        const paymentStatusTitle = document.createElement('h2');
        paymentStatusTitle.textContent = 'Payment Status';
        const paymentStatus = document.createElement('p');
        paymentStatus.textContent = order.PaymentStatus;
        column.appendChild(paymentStatusTitle);
        column.appendChild(paymentStatus);

        leftContainer.appendChild(column);    
    }
    
    fetchOrders();
});