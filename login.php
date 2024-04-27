<?php
    session_start();

    $username = $_POST['login-username'];
    $password = $_POST['login-password'];
    
    require_once 'db_connect.php'; // Connect to database
    
    // Query to fetch the UserType along with other necessary details
    $stmt = $con->prepare("SELECT UserID, UserPassword, UserType FROM users WHERE Username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    header('Content-Type: application/json');

    if ($stmt_result->num_rows > 0) {
        $data = $stmt_result->fetch_assoc();
        if ($data['UserPassword'] === $password) {
            $_SESSION['user-id'] = $data['UserID']; // Store ID in session variable
            $_SESSION['user-type'] = $data['UserType']; // store their user type as a session variable

            // Return user type for client-side logic
            echo json_encode(['status' => 'success', 'userType' => $data['UserType']]);
            exit();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
            exit();    
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        exit();
    }

    mysqli_close($con);
?>
