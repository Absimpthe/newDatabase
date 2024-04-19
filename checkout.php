<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

$stmt = $con->prepare("select * from customers where CustomerID = ?");
$stmt->bind_param("s", $_SESSION['user-id']);
$stmt->execute();
$stmt_result = $stmt->get_result();

// get today's date
$date = date('Y-m-d');
$orderstatus = "Confirmed";
$paymentstatus = "Pending";

if ($stmt_result->num_rows > 0) {
    
    if (isset($_SESSION['cart'])) {
        
        if (!empty($_SESSION['cart'])) {

            // Update orders table
            $add_order = $con->prepare("INSERT INTO orders (CustomerID, TotalPrice, Date, OrderStatus, PaymentStatus) VALUES (?, ?, ?, ?, ?)");
            $add_order->bind_param("idsss", $_SESSION['user-id'], $_SESSION['Total'], $date, $orderstatus, $paymentstatus);
            $add_order->execute();

            //
            $last_id = $con->insert_id;

            foreach ($_SESSION['cart'] as $item) {
                // Get the item code
                $find_item = $con->prepare("select ItemCode from items where ItemName = ?");
                $find_item->bind_param("s", $item['name']);
                $find_item->execute();
                $find_item_result = $find_item->get_result();
                $item_code = $find_item_result->fetch_assoc();

                $add_order_items = $con->prepare("INSERT INTO orderitems (orderID, ItemCode, ItemQuantity, SubtotalPrice) VALUES (?, ?, ?, ?)");
                $add_order_items->bind_param("isid", $last_id, $item_code['ItemCode'], $item['quantity'], $item['price']);
                $add_order_items->execute();
            }
            // Clear the cart
            $_SESSION['cart'] = [];

            echo json_encode(['status' => 'success']);
            exit();
        } else {
            // The cart is empty
            echo json_encode(['status' => 'error', 'message' => 'Cart is empty']);
            exit();
        }
    } else {
        // The cart does not exist
        echo json_encode(['status' => 'error', 'message' => 'Cart does not exist']);
        exit();
    }
  }

?>