<?php

    session_start();
    require_once '../db_connect.php'; // connect to database

    // Get the driver details from the client side
    $username = $_POST['driver-username'];
    $phone_no = $_POST['driver-phone-no'];
    $email = $_POST['driver-email'];
    $address = $_POST['driver-address'];
    $password = $_POST['driver-password'];
    $car_plate = $_POST['driver-car-plate'];

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
        // Prepare statement to add in driver details into database
        $usertype = 'Driver';
        $stmt = $con->prepare("INSERT INTO users (Username, UserPassword, Address, EmailAddress, PhoneNumber, UserType) VALUES (?, ?, ?, ?, ?, ?)");
        
        // Bind parameters
        $stmt->bind_param("ssssss", $username, $password, $address, $email, $phone_no, $usertype);

        // Execute the statement
        if ($stmt->execute()) {
            // if stmt executed, add to drivers table using the ID
            $last_id = $con->insert_id;
            $stmt_insert = $con->prepare("INSERT INTO drivers (DriverID, CarPlateNo, DriverRating) VALUES (?, ?, 5)");
            $stmt_insert->bind_param("ss", $last_id, $car_plate);
            if ($stmt_insert->execute()) {
                echo json_encode(['status' => 'success']);
            }
            else {
                echo json_encode(['status' => 'error', 'message' => "Error: " . $stmt->error]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => "Error: " . $stmt->error]);
        }

        // Close statement
        $stmt->close();
    }
    exit();
    mysqli_close($con);
?>