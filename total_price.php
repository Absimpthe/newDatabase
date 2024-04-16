<?php
    session_start();
    header('Content-Type: application/json');

    $_SESSION['Total'] = 0;

    
    foreach ($_SESSION['cart'] as $subtotal) {
        $_SESSION['Total'] += $subtotal['subtotal'];
    }
    
    $data = $_SESSION['Total'];
    
    echo json_encode($data);
     
?>