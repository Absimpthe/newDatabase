<?php
session_start(); // Start or resume a session

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $itemCode = $data['itemCode'];

    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }

    if (!isset($_SESSION['cart'][$itemCode])) {
        $_SESSION['cart'][$itemCode] = 1; // Initial quantity
    } else {
        $_SESSION['cart'][$itemCode] += 1; // Increment quantity
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
