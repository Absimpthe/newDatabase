<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

// Prepare statement for fetching orders along with customer addresses
$stmtOrders = $con->prepare("SELECT * FROM orders WHERE OrderStatus = ?");
$confirmedStatus = 'In Progress';
$stmtOrders->bind_param("s", $confirmedStatus);
$stmtOrders->execute();
$stmt_resultOrders = $stmtOrders->get_result();

$orders = [];

// Check if there are results
if ($stmt_resultOrders->num_rows > 0) {
    while($order = $stmt_resultOrders->fetch_assoc()) {
        $orderID = $order['OrderID'];

        // Prepare statement for fetching items for this specific order
        $stmtItems = $con->prepare("SELECT * FROM orderItems WHERE OrderId = ?");
        $stmtItems->bind_param("s", $orderID);
        $stmtItems->execute();
        $stmt_resultItems = $stmtItems->get_result();

        // Fetch items and store them in the array
        $items = [];
        while($item = $stmt_resultItems->fetch_assoc()) {
            $items[] = $item;
        }

        // Add items array to the order
        $order['Items'] = $items;

        // Add order to orders array
        $orders[] = $order;
    }

    // Echo response accordingly
    echo json_encode(['status' => 'success', 'data' => $orders]); // If data is retrieved from the database, send data
} else {
    echo json_encode(['status' => 'error', 'message' => 'No accepted orders.']); // If there is error, send error message
}

exit();
?>
