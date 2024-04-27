<?php
session_start(); // Ensure the session is started

// Define a function to send a JSON response
function sendJson($status, $message = '', $data = []) {
    header('Content-Type: application/json');
    echo json_encode(['success' => $status, 'message' => $message, 'data' => $data]);
    exit;
}

// Check if the cart exists in the session
if (isset($_SESSION['cart'])) {
    // If the cart is not empty, send cart data
    if ($_SESSION['cart'] == []) {
        sendJson(true, 'Cart retrieved successfully', $_SESSION['cart']);
    } else {
        // The cart is empty
        sendJson(false, 'Cart is empty');
    }
} else {
    // The cart does not exist
    sendJson(false, 'No cart found');
}
?>
