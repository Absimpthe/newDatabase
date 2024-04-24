<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // Convert JSON to array

// Check for necessary data
if (!isset($input['orderID']) || trim($input['orderID']) == '' || 
    !isset($input['newStatus']) || trim($input['newStatus']) == '') {
    echo json_encode(['status' => 'error', 'message' => 'Required data is missing']);
    exit;
}

$orderID = $input['orderID'];
$newStatus = $input['newStatus'];

// Validate the new status
$allowedStatuses = ['In Progress', 'Completed'];
if (!in_array($newStatus, $allowedStatuses)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid status provided']);
    exit;
}

// Prepare an update statement to change the order status and payment status based on the input
if ($newStatus === 'Completed') {
    $paymentStatus = 'Completed';
    $stmt = $con->prepare("UPDATE orders SET OrderStatus = ?, PaymentStatus = ? WHERE OrderID = ?");
    $stmt->bind_param("ssi", $newStatus, $paymentStatus, $orderID);
} else {
    // If not completed, do not update PaymentStatus
    $stmt = $con->prepare("UPDATE orders SET OrderStatus = ? WHERE OrderID = ?");
    $stmt->bind_param("si", $newStatus, $orderID);
}

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order status and payment status updated to ' . $newStatus]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update order and payment status']);
}

// Close the statement and connection
$stmt->close();
$con->close();
?>
