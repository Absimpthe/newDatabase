document.addEventListener('DOMContentLoaded', function() {
    function fetchOrders() {
        fetch('show_orders.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                data.data.orders.forEach(order => {
                    // finds all order items items that match the orderID
                    let items = data.data.orderItems.filter(items => items.OrderID === order.OrderID);
                    updateOrderDisplay(order);
                    updateOrderItemsDisplay(items);
                });
                
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    function updateOrderDisplay(order) {
        const leftColumn = document.querySelector('#left-column');

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

        leftColumn.appendChild(column);    
    }

    function updateOrderItemsDisplay(items) {
        const rightColumn = document.querySelector('#right-column');
        items.forEach(item => {
    
            const orderItemsDetails = document.createElement('div');
            orderItemsDetails.className = 'order-items-details';

            const itemNameTitle = document.createElement('h2');
            itemNameTitle.textContent = 'Item Name';
            const itemName = document.createElement('p');
            itemName.textContent = item.ItemCode;
            orderItemsDetails.appendChild(itemNameTitle);
            orderItemsDetails.appendChild(itemName);

            const itemQuantityTitle = document.createElement('h2');
            itemQuantityTitle.textContent = 'Quantity';
            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = item.ItemQuantity;
            orderItemsDetails.appendChild(itemQuantityTitle);
            orderItemsDetails.appendChild(itemQuantity);

            rightColumn.appendChild(orderItemsDetails);
        });
        
    }
    fetchOrders();
});