<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $current_password = $_POST['current-password'];
    $new_password = $_POST['update-password'];

    // Prepare statement to get the user details from the database
    $stmt = $con->prepare("select * from users where UserID = ?");
    $stmt->bind_param("i", $_SESSION['user-id']);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    $data = $stmt_result->fetch_assoc();

    // Checks if the password has been inputted correctly
    if ($current_password != $data['UserPassword']) {
        echo json_encode(['status' => 'error', 'message' => 'Entered incorrect password']);
    }
    else {
        // Update the password to the new password
        if ($new_password === $data['UserPassword']) {
            echo json_encode(['status' => 'error', 'message' => 'Cannot enter same password as before']);
        }
        else {  
            // Prepare statement to update record
            $stmt = $con->prepare("UPDATE users SET UserPassword = ? WHERE UserID = ?");
    
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
    }
        

    $stmt->close();
    $con->close();

?>