<?php
    session_start();
    header('Content-Type: application/json');

    // Create and initialize a session variable called 'Total' to 0
    $_SESSION['Total'] = 0;

    // Calculate the total by adding all subtotals together
    foreach ($_SESSION['cart'] as $subtotal) {
        $_SESSION['Total'] += $subtotal['subtotal'];
    }
    
    $data = $_SESSION['Total'];
    
    // Send the data back to the server
    echo json_encode($data);
     
?>