<?php

    session_start();
    require_once 'db_connect.php';
    header('Content-Type: application/json');

    $new_address = $_POST['update-address'];

    // Prepare statement to update record
    $stmt = $con->prepare("UPDATE users SET Address = ? WHERE UserID = ?");

    // Bind parameters
    $stmt->bind_param("si", $new_address, $_SESSION['user-id']);

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