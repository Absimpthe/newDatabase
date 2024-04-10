<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; 

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'guest']);
    exit();
  }

$stmt = $con->prepare("select * from customers where CustUsername = ?");
$stmt->bind_param("s", $_SESSION['username']);
$stmt->execute();
$stmt_result = $stmt->get_result();

// Check if there are results 
if ($stmt_result->num_rows > 0) {
  $data = $stmt_result->fetch_assoc();
  echo json_encode($data);
}



exit();
?>