<?php

    session_start();

    $username = $_POST['login-username'];
    $password = $_POST['login-password'];
    
    require_once 'db_connect.php'; // connect to database
    
    $stmt = $con->prepare("select * from customers where CustUsername = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    header('Content-Type: application/json');

    if ($stmt_result->num_rows > 0) {
        $data = $stmt_result->fetch_assoc();
        if ($data['CustPassword'] === $password) {
            $_SESSION['user-id'] = $data['CustomerID']; // store their ID as a session variable
            echo json_encode(['status' => 'success']);
            exit();
            // fetch user data
            // redirect user to menu page
        }
        else {
            // inform user of wrong login details 
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
            exit();    
        }
    }
    else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        exit();
        
    }

    mysqli_close($con);
?>