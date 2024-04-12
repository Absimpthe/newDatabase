<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $newUsername = $_POST['update-username'];

    $stmt = $con->prepare("select * from customers where CustUsername = ?");
    $stmt->bind_param("s", $newUsername);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    // Check if username already exists
    if ($stmt_result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username already taken']);
    }
    else {
         // Prepare statement to update record
        $stmt = $con->prepare("UPDATE customers SET CustUsername = ? WHERE CustomerID = ".$_SESSION['user-id']);

        // Bind parameters
        $stmt->bind_param("s", $newUsername);

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