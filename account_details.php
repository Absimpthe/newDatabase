<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'guest']);
    exit();
  }

require_once 'db_connect.php'; 

$sql = "SELECT CustomerID, CustUsername, CustPassword, Address, EmailAddress, PhoneNumber, isAdmin FROM customers";
$result = $con->query($sql);

// Check if there are results 
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
}

echo json_encode($data);

$con->close();
?>