<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Convert JSON to array

if (!isset($input['orderID']) || trim($input['orderID']) == '') {
    echo json_encode(['status' => 'error', 'message' => 'Order ID is missing']);
    exit;
}

$orderID = $input['orderID'];

// Prepare an update statement to change the order status to "In Progress"
$stmt = $con->prepare("UPDATE orders SET OrderStatus = 'In Progress' WHERE OrderID = ?");
$stmt->bind_param("i", $orderID);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order status updated to In Progress']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update order status']);
}

// Close the statement and connection
$stmt->close();
$con->close();
?>
