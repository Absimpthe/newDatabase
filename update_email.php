<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $new_email = $_POST['update-email'];

    $stmt = $con->prepare("select * from customers where CustomerID = ?");
    $stmt->bind_param("i", $_SESSION['user-id']);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    $data = $stmt_result->fetch_assoc();

    // Check if email is the same
    if ($new_email === $data['EmailAddress']) {
        echo json_encode(['status' => 'error', 'message' => 'Cannot enter same email as before']);
        exit();
    }

    $stmt = $con->prepare("select * from customers where EmailAddress = ?");
    $stmt->bind_param("s", $new_email);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    // Check if email already exists
    if ($stmt_result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email already taken']);
    }
    else {
        $stmt = $con->prepare("UPDATE customers SET EmailAddress = ? WHERE CustomerID = ?");

        // Bind parameters
        $stmt->bind_param("si", $new_email, $_SESSION['user-id']);

        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } 
        else {
            echo json_encode(['status' => 'error']);
        }
    }
    // Prepare statement to update record
    

    $stmt->close();
    $con->close();

?>