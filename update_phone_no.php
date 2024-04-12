<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $new_phone_no = $_POST['update-phone-no'];

    // Prepare statement to update record
    $stmt = $con->prepare("UPDATE customers SET PhoneNumber = ? WHERE CustomerID = ?");

    // Bind parameters
    $stmt->bind_param("si", $new_phone_no, $_SESSION['user-id']);

    // Execute statement
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } 
    else {
        echo json_encode(['status' => 'error']);
    }

    $stmt->close();
    $con->close();

?>