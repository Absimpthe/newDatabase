<?php

    session_start();

    $username = $_POST['signup-username'];
    $phone_no = $_POST['phone-no'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $password = $_POST['signup-password'];
    
    $con = new mysqli("localhost","root","","comp1044_database");
    if($con->connect_error) {
        die("Failed to connect: ".$con->connect_error);
    }
    else {
        $stmt1 = $con->prepare("select * from customers where CustUsername = ?");
        $stmt1->bind_param("s", $username);
        $stmt1->execute();
        $stmt1_result = $stmt1->get_result();

        $stmt2 = $con->prepare("select * from customers where EmailAddress = ?");
        $stmt2->bind_param("s", $email);
        $stmt2->execute();
        $stmt2_result = $stmt2->get_result();

        header('Content-Type: application/json');

        if ($stmt1_result->num_rows > 0) {
            $data = $stmt1_result->fetch_assoc();
            echo json_encode(['status' => 'error', 'message' => 'This username is already in use.']);
            exit();
        }
        if ($stmt2_result->num_rows > 0) {
            $data = $stmt2_result->fetch_assoc();
            echo json_encode(['status' => 'error', 'message' => 'This email is already in use.']);
            exit();
        }

        $sql = 'INSERT INTO comp1044_database(CustUsername,CustPassword,Address,EmailAddress,PhoneNumber,isAdmin) VALUES ($username,$password,$address,$email,$phone_no, 0)';  
        if(mysqli_query($con, $sql)){  
            echo "Record inserted successfully";  
        }
        else {  
           echo "Could not insert record: ". mysqli_error($con);  
        }  

        echo json_encode(['status' => 'success']);
        exit();
            //echo "<h2>Invalid username or password</h2>";
        
    }

    mysqli_close($con);
?>