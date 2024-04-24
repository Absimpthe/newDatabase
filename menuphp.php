<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; // connect to database

$sql = "SELECT * FROM items";
$result = $con->query($sql);

// Array to hold the menu items
$menuItems = [];

// Check if there are results and loop through each row
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Add each row to the menuItems array
        $menuItems[] = $row;
    }
}

// Output the menuItems array as JSON
echo json_encode($menuItems);

$con->close();
?>
