<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

$stmt = $con->prepare("select * from customers where CustomerID = ?");
$stmt->bind_param("s", $_SESSION['user-id']);
$stmt->execute();
$stmt_result = $stmt->get_result();

if ($stmt_result->num_rows > 0) {
    $user_data = $stmt_result->fetch_assoc();
    
    if (isset($_SESSION['cart'])) {
        
        if (!empty($_SESSION['cart'])) {

            // need to update orders table first
            foreach ($_SESSION['cart'] as $item) {
                // Get the item code
                $find_item = $con->prepare("select ItemCode from items where ItemName = ?");
                $find_item->bind_param("s", $item['name']);
                $find_item->execute();
                $find_item_result = $find_item->get_result();
                $item_code = $find_item_result->fetch_assoc();

                $add_order = $con->prepare("INSERT INTO orderitems (ItemCode, ItemQuantity, SubtotalPrice) VALUES (?, ?, ?)");
                $add_order->bind_param("sid", $item_code['ItemCode'], $item['quantity'], $item['price']);
                $add_order->execute();
            }


            echo json_encode(['status' => 'success']);
        } else {
            // The cart is empty
            echo json_encode(['status' => 'error', 'message' => 'Cart is empty']);
        }
    } else {
        // The cart does not exist
        echo json_encode(['status' => 'error', 'message' => 'Cart does not exist']);
    }
  }

?>