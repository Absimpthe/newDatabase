<?php
session_start();
header('Content-Type: application/json');

require_once '../db_connect.php';

// Assume userID is passed via session or another method, validate it
if (!isset($_SESSION['user-id']) || empty($_SESSION['user-id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User ID not provided.']);
    exit();
}

$userId = $_SESSION['user-id']; // set variable to the user ID that is currently logged in

// Prepare statement for fetching orders by user ID
$stmtOrders = $con->prepare("SELECT * FROM orders");
$stmtOrders->execute();
$stmt_resultOrders = $stmtOrders->get_result();

$orders = [];

// Check if there are results
if ($stmt_resultOrders->num_rows > 0) {
    while ($order = $stmt_resultOrders->fetch_assoc()) {
        // Use the correct field name for the order ID
        $orderID = $order['OrderID']; 

        // Prepare statement for fetching items for this specific order
        $stmtItems = $con->prepare("SELECT * FROM orderItems WHERE OrderId = ?");
        $stmtItems->bind_param("s", $orderID);
        $stmtItems->execute();
        $stmt_resultItems = $stmtItems->get_result();

        // Fetch items and store them in the array
        $items = [];
        while ($item = $stmt_resultItems->fetch_assoc()) {
            $items[] = $item;
        }

        // Add items array to the order only if items are found
        $order['Items'] = $items;

        // Add order to orders array
        $orders[] = $order;
    }

    echo json_encode(['status' => 'success', 'data' => $orders]); // send the orders back to the js file
} else {
    echo json_encode(['status' => 'error', 'message' => 'No orders found for the user.']);
}

exit();
?>