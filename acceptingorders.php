<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; 

// Check the type of request and proceed accordingly
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'acceptOrder' && isset($_SESSION['user-id'])) {
    $driverId = $_SESSION['user-id'];
    $orderID = $_POST['orderID'];

    // Insert into deliveries table
    $stmtInsert = $con->prepare("INSERT INTO deliveries (OrderID, DriverID) VALUES (?, ?)");
    $stmtInsert->bind_param("ii", $orderID, $driverId); // Make sure variable names are consistent ($driverId)
    $result = $stmtInsert->execute();

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Order has been added to deliveries.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to insert delivery.']);
    }
    exit();
}
?>
