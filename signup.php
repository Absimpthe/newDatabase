<?php

    session_start();
    require_once 'db_connect.php'; // connect to database

    $username = $_POST['signup-username'];
    $phone_no = $_POST['phone-no'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $password = $_POST['signup-password'];

    // checks if the username exists in the database
    $stmt1 = $con->prepare("select * from customers where CustUsername = ?");
    $stmt1->bind_param("s", $username);
    $stmt1->execute();
    $stmt1_result = $stmt1->get_result();

    // checks if the email exists in the database
    $stmt2 = $con->prepare("select * from customers where EmailAddress = ?");
    $stmt2->bind_param("s", $email);
    $stmt2->execute();
    $stmt2_result = $stmt2->get_result();

    header('Content-Type: application/json');

    if ($stmt1_result->num_rows > 0) {
        $data = $stmt1_result->fetch_assoc();
        echo json_encode(['status' => 'error', 'message' => 'This username is already in use.']);
        $stmt1->close();
    }
    else if ($stmt2_result->num_rows > 0) {
        $data = $stmt2_result->fetch_assoc();
        echo json_encode(['status' => 'error', 'message' => 'This email is already in use.']);
        $stmt2->close();
    }
    else {
        $stmt = $con->prepare("INSERT INTO customers (CustUsername, CustPassword, Address, EmailAddress, PhoneNumber, isAdmin) VALUES (?, ?, ?, ?, ?, 0)");

        // Bind parameters
        $stmt->bind_param("sssss", $username, $password, $address, $email, $phone_no);

        // Execute the statement
        if ($stmt->execute()) {
            $get_user = $con->prepare("select * from customers where CustUsername = ?");
            $get_user->bind_param("s", $username);
            $get_user->execute();
            $get_user_result = $get_user->get_result();
            $data = $get_user_result->fetch_assoc();

            $_SESSION['user-id'] = $data['CustomerID']; // store their ID as a session variable
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => "Error: " . $stmt->error]);
        }

        // Close statement
        $stmt->close();
    }
    exit();
    

    mysqli_close($con);
?>