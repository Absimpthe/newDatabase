document.addEventListener('DOMContentLoaded', function() {
    function fetchOrders() {
        fetch('show_orders.php', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.orders.forEach(order => {
                    updateOrderDisplay(order);
                });
                
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        })
        .catch(error => console.error('Error fetching orders:', error));
    }

    function updateOrderDisplay(order) {
        const orderTableBody = document.querySelector('#orderTable tbody');
        orderTableBody.innerHTML = ''; // Clear the current order display
    
        Object.keys(order).forEach(OrderID => {
            const row = document.createElement('tr');
            
            const orderIDCell = document.createElement('td');
            orderIDCell.textContent = OrderID;
            row.appendChild(orderIDCell);

            const totalPrice = document.createElement('td');
            totalPrice.textContent = `RM${order[OrderID].TotalPrice.toFixed(2)}`; 
            row.appendChild(totalPrice);
    
            const date = document.createElement('td');
            date.textContent = order[OrderID].Date; 
            row.appendChild(date);
    
            const orderStatus = document.createElement('td');
            orderStatus.textContent = order[OrderID].OrderStatus;
            row.appendChild(orderStatus);

            const paymentStatus = document.createElement('td');
            paymentStatus.textContent = order[OrderID].PaymentStatus;
            row.appendChild(paymentStatus);
    
            // Append the row to the table body
            orderTableBody.appendChild(row);
        });
    }
    
    fetchOrders();
});