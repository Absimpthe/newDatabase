<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; 

if (!isset($_SESSION['user-id'])) {
    echo json_encode(['status' => 'guest']);
    exit();
  }

$stmt = $con->prepare("select * from orders where CustomerID = ?");
$stmt->bind_param("s", $_SESSION['user-id']);
$stmt->execute();
$stmt_result = $stmt->get_result();

// Check if there are results 
if ($stmt_result->num_rows > 0) {
    while($row = $stmt_result->fetch_assoc()) {
    // Add each row to orders array
    $orders[] = $row;
    }

    foreach($orders as $order) {
        $stmt = $con->prepare("select * from orderItems where OrderId = ?");
        $stmt->bind_param("s", $orders['OrderId']);
        $stmt->execute();
        $stmt_result = $stmt->get_result();
        $rowItems = $stmt_result->fetch_assoc();
        $orderItems[] = $rowItems;
    }

    $data = [
        "orders" => $orders,
        "orderItems" => $orderItems
    ];

    echo json_encode(['success' => 'success', 'data' => $data]);
}
else {
    echo json_encode(['status' => 'error', 'message' => 'No orders.']);
}



exit();
?>