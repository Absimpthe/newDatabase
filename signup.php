<?php

    session_start();
    require_once 'db_connect.php'; // connect to database

    $username = $_POST['signup-username'];
    $phone_no = $_POST['phone-no'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $password = $_POST['signup-password'];

    // checks if the username exists in the database
    $stmt1 = $con->prepare("select * from users where Username = ?");
    $stmt1->bind_param("s", $username);
    $stmt1->execute();
    $stmt1_result = $stmt1->get_result();

    // checks if the email exists in the database
    $stmt2 = $con->prepare("select * from users where EmailAddress = ?");
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
        $usertype = 'Customer';
        $stmt = $con->prepare("INSERT INTO users (Username, UserPassword, Address, EmailAddress, PhoneNumber, UserType) VALUES (?, ?, ?, ?, ?, ?)");

        // Bind parameters
        $stmt->bind_param("ssssss", $username, $password, $address, $email, $phone_no, $usertype);

        // Execute the statement
        if ($stmt->execute()) {
            $get_user = $con->prepare("select * from users where Username = ?");
            $get_user->bind_param("s", $username);
            $get_user->execute();
            $get_user_result = $get_user->get_result();
            $data = $get_user_result->fetch_assoc();

            $_SESSION['user-id'] = $data['UserID']; // store their ID as a session variable
            $_SESSION['user-type'] = $data['UserType']; // store their user type as a session variable
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