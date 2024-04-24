<?php

session_start();
require_once '../db_connect.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['items'])) {
    foreach ($data['items'] as $item) {
        $stmt = $con->prepare("UPDATE items SET ItemName = ?, Price = ?, Availability = ? WHERE ItemCode = ?");
        $stmt->bind_param('sdii', $item['itemName'], $item['price'], $item['availability'], $item['itemCode']);
        
        if (!$stmt->execute()) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update item: ' . $stmt->error]);
            $stmt->close();
            $con->close();
            exit;
        }
    }

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}

$stmt->close();
$con->close();
?>