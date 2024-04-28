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
    $stmtInsert->bind_param("ii", $orderID, $driverId);
    $result = $stmtInsert->execute();

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Order has been added to deliveries.']); // If data is added to the database, send success message
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to insert delivery.']); // If there is error, send error message
    }
    exit();
}
?>
