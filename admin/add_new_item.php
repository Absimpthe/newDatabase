<?php

    session_start();
    require_once '../db_connect.php';
    header('Content-Type: application/json');

    // Get new item details from the client side
    $new_item_id = $_POST['new-item-id'];
    $new_item_name = $_POST['new-item-name'];
    $new_item_price = $_POST['new-item-price'];
    $formatted_price = round($new_item_price, 2);
    $new_item_category = $_POST['new-item-category'];
    $new_item_availability = $_POST['new-item-availability'];
    $new_item_image = $_POST['new-item-image'];

    // Prepare statement to check the item code
    $stmt = $con->prepare("select * from items where ItemCode = ?");
    $stmt->bind_param("s", $new_item_id);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    // Check if item code exists
    if ($stmt_result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Cannot enter the same ID code']);
        exit();
    }
    
    // Prepare statement to add the new item details into the database
    $stmt = $con->prepare("INSERT INTO items (ItemCode, ItemName, Price, Availability, CategoryID, ItemImage) VALUES (?, ?, ?, ?, ?, ?)");

    // Bind parameters
    $stmt->bind_param("ssdiis", $new_item_id, $new_item_name, $formatted_price, $new_item_availability, $new_item_category, $new_item_image);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => "Error: " . $stmt->error]);
    }

    // Close statement
    $stmt->close();
    $con->close();

?>