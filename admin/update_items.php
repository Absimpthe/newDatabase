<?php

session_start();
require_once '../db_connect.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['items'])) {
    foreach ($data['items'] as $item) {
        // Redefine variables within the loop scope
        $itemName = $item['itemName'];
        $price = $item['price'];
        $availability = $item['availability'];
        $itemCode = $item['itemCode'];

        // Prepare statement to change item details in the database accordingly
        $stmt = $con->prepare("UPDATE items SET ItemName = ?, Price = ?, Availability = ? WHERE ItemCode = ?");
        // Bind parameters
        $stmt->bind_param('sdis', $itemName, $price, $availability, $itemCode);
        
        // Execute the statement
        if (!$stmt->execute()) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update item: ' . $stmt->error]);
            $stmt->close();
            $con->close();
            exit;
        }
        $stmt->close();
    }

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}

$con->close();

?>
