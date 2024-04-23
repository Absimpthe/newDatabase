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
        $stmt = $con->prepare("select * from orderitems where OrderID = ?");
        $stmt->bind_param("i", $order['OrderID']);
        $stmt->execute();
        $stmt_result = $stmt->get_result();
        while($rowItems = $stmt_result->fetch_assoc()) {
            $orderItems[] = $rowItems;
        }
        
    }

    $data = [
        "orders" => $orders,
        "orderItems" => $orderItems
    ];

    echo json_encode(['status' => 'success', 'data' => $data]);
}
else {
    echo json_encode(['status' => 'error', 'message' => 'No orders.']);
}



exit();
?>