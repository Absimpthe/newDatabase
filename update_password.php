<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $new_password = $_POST['update-password'];

    $stmt = $con->prepare("select * from customers where CustomerID = ?");
    $stmt->bind_param("i", $_SESSION['user-id']);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    $data = $stmt_result->fetch_assoc();

    if ($new_password === $data['CustPassword']) {
        echo json_encode(['status' => 'error', 'message' => 'Cannot enter same password as before']);
    }
    else {
        // Prepare statement to update record
        $stmt = $con->prepare("UPDATE customers SET CustPassword = ? WHERE CustomerID = ?");

        // Bind parameters
        $stmt->bind_param("si", $new_password, $_SESSION['user-id']);

        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } 
        else {
            echo json_encode(['status' => 'error']);
        }
    }

    $stmt->close();
    $con->close();

?>