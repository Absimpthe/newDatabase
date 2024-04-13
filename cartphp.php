<?php
session_start();

function sendJson($status, $message = '', $data = []) {
    header('Content-Type: application/json');
    echo json_encode(['success' => $status, 'message' => $message, 'data' => $data]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents('php://input'), true);
    $itemCode = $postData['itemCode'];
    $itemName = $postData['itemName'];
    $itemPrice = $postData['itemPrice'];
    $increment = $postData['increment'];

    if (!isset($_SESSION['cart'][$itemCode])) {
        // Add new item
        $_SESSION['cart'][$itemCode] = [
            'name' => $itemName,
            'price' => $itemPrice,
            'quantity' => $increment,
            'subtotal' => $itemPrice
        ];
    } else {
        // Increment existing item quantity
        $_SESSION['cart'][$itemCode]['quantity'] += $increment;
        $_SESSION['cart'][$itemCode]['subtotal'] = $_SESSION['cart'][$itemCode]['quantity'] * $itemPrice;
    }

    sendJson(true, 'Item added/updated in cart');
}
?>

