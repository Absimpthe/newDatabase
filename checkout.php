<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php';

$stmt = $con->prepare("select * from users where UserID = ?");
$stmt->bind_param("s", $_SESSION['user-id']);
$stmt->execute();
$stmt_result = $stmt->get_result();

// Fetch the address from POST data and validate it
$address = $_POST['address'];
if (empty($address)) {
    echo json_encode(['status' => 'error', 'message' => 'Address is missing']);
    exit();
}

// get today's date
$date = date('Y-m-d');
$orderstatus = "Confirmed";
$paymentstatus = "Pending";

if ($stmt_result->num_rows > 0) {
    
    if (isset($_SESSION['cart'])) {
        
        if (!empty($_SESSION['cart'])) {

            // Update orders table
            $add_order = $con->prepare("INSERT INTO orders (UserID, Address, TotalPrice, Date, OrderStatus, PaymentStatus) VALUES (?, ?, ?, ?, ?, ?)");
            $add_order->bind_param("isdsss", $_SESSION['user-id'], $address, $_SESSION['Total'], $date, $orderstatus, $paymentstatus);
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
            
                // Calculate the subtotal for the current item
                $subtotalPrice = $item['price'] * $item['quantity'];
            
                // Prepare statement to insert the order item
                $add_order_items = $con->prepare("INSERT INTO orderitems (OrderID, ItemCode, ItemQuantity, SubtotalPrice) VALUES (?, ?, ?, ?)");
                $add_order_items->bind_param("isid", $last_id, $item_code['ItemCode'], $item['quantity'], $subtotalPrice);
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