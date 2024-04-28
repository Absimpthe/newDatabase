<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; // connect to db

// check if there is a user logged in during the session
if (!isset($_SESSION['user-id'])) {
    echo json_encode(['status' => 'guest']); // if no user logged in, inform server
    exit();
  }

  // prepare statement to get user details from database
$stmt = $con->prepare("select * from users where UserID = ?");
$stmt->bind_param("s", $_SESSION['user-id']);
$stmt->execute();
$stmt_result = $stmt->get_result();

// Check if there are results 
if ($stmt_result->num_rows > 0) {
  $data = $stmt_result->fetch_assoc();
  echo json_encode($data); // send the data 
}



exit();
?>