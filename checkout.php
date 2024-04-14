<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

$stmt = $con->prepare("select * from customers where CustomerID = ?");
$stmt->bind_param("s", $_SESSION['user-id']);
$stmt->execute();
$stmt_result = $stmt->get_result();

// get today's date here

if ($stmt_result->num_rows > 0) {
    $user_data = $stmt_result->fetch_assoc();
    
    if (isset($_SESSION['cart'])) {
        
        if (!empty($_SESSION['cart'])) {

            // Update orders table
            $add_order = $con->prepare("INSERT INTO orders (CustomerID, TotalPrice, Date, OrderStatus, Payment Status) VALUES (?, ?, ?, Pending, Pending");
            $add_order->bind_param("ids", $_SESSION['user_id'], $_SESSION['Total'], $date);
            $add_order->execute();

            $sql = $con->prepare("select OrderID from orders where CustomerID = ?");
            $sql->bind_param("s", $_SESSION['user_id']);
            $sql->execute();
            $sql_result = $sql->get_result();
            $order_id = $sql_result->fetch_assoc();

            foreach ($_SESSION['cart'] as $item) {
                // Get the item code
                $find_item = $con->prepare("select ItemCode from items where ItemName = ?");
                $find_item->bind_param("s", $item['name']);
                $find_item->execute();
                $find_item_result = $find_item->get_result();
                $item_code = $find_item_result->fetch_assoc();

                $add_order_items = $con->prepare("INSERT INTO orderitems (orderID, ItemCode, ItemQuantity, SubtotalPrice) VALUES (?, ?, ?, ?)");
                $add_order_items->bind_param("isid", $order_id['orderID'], $item_code['ItemCode'], $item['quantity'], $item['price']);
                $add_order_items->execute();
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