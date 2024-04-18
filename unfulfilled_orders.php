<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; 

$stmt = $con->prepare("SELECT * FROM orders WHERE OrderStatus = ?");
$confirmedStatus = 'Confirmed';
$stmt->bind_param("s", $confirmedStatus);
$stmt->execute();
$stmt_result = $stmt->get_result();

$orders = [];
$orderItems = [];

// Check if there are results 
if ($stmt_result->num_rows > 0) {
    while($row = $stmt_result->fetch_assoc()) {
        // Add each row to orders array
        $orders[] = $row;
    }

    // Fetch items for each order
    foreach($orders as $order) {
        $stmt = $con->prepare("SELECT * FROM orderItems WHERE OrderId = ?");
        $stmt->bind_param("s", $order['OrderId']);
        $stmt->execute();
        $stmt_result = $stmt->get_result();
        
        while($rowItems = $stmt_result->fetch_assoc()) {
            $orderItems[$order['OrderId']][] = $rowItems;
        }
    }

    $data = [
        "orders" => $orders,
        "orderItems" => $orderItems
    ];

    echo json_encode(['status' => 'success', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No confirmed orders.']);
}

exit();
?>
