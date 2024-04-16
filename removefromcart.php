<?php
session_start(); // Start the session to access session variables

// Initialize the cart if not already set
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Function to remove an item from the cart
function removeFromCart($itemCode) {
    // Check if the item exists in the cart
    if (array_key_exists($itemCode, $_SESSION['cart'])) {
        unset($_SESSION['cart'][$itemCode]); // Remove the item
        return true;
    }
    return false;
}

// Check if the itemCode is provided in the GET request
if (isset($_GET['itemCode'])) {
    $itemCode = $_GET['itemCode'];
    $result = removeFromCart($itemCode);

    // Prepare and send the JSON response
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Item removed successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Item not found in the cart']);
    }
} else {
    // itemCode not provided in the GET request
    echo json_encode(['success' => false, 'message' => 'Item code not provided']);
}
?>
