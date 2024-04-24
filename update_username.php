<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $new_username = $_POST['update-username'];

    $stmt = $con->prepare("select * from users where UserID = ?");
    $stmt->bind_param("i", $_SESSION['user-id']);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    $data = $stmt_result->fetch_assoc();

    // Check if username is the same
    if ($new_username === $data['Username']) {
        echo json_encode(['status' => 'error', 'message' => 'Cannot enter same username as before']);
        exit();
    }
    
    $stmt = $con->prepare("select * from users where Username = ?");
    $stmt->bind_param("s", $new_username);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    // Check if username already exists
    if ($stmt_result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username already taken']);
    }
    else {
         // Prepare statement to update record
        $stmt = $con->prepare("UPDATE users SET Username = ? WHERE UserID = ".$_SESSION['user-id']);

        // Bind parameters
        $stmt->bind_param("s", $new_username);

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