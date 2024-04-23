<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

// Assume userID is passed via session or another method, validate it
if (!isset($_SESSION['user-id']) || empty($_SESSION['user-id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User ID not provided.']);
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

$userId = $_SESSION['user-id'];

// Prepare statement for fetching orders by user ID
$stmtOrders = $con->prepare("SELECT * FROM orders WHERE CustomerId = ?");
$stmtOrders->bind_param("s", $_SESSION['user-id']);
$stmtOrders->execute();
$stmt_resultOrders = $stmtOrders->get_result();

$orders = [];

// Check if there are results
if ($stmt_resultOrders->num_rows > 0) {
    while ($order = $stmt_resultOrders->fetch_assoc()) {
        // Use the correct field name for the order ID
        $orderID = $order['OrderID'];  // Assuming 'OrderID' is the correct column name

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

    echo json_encode(['status' => 'success', 'data' => $orders]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No orders found for the user.']);
}

exit();
?>
