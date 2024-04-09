<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "comp1044_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT ItemCode, ItemName, Price, ItemImage FROM items";
$result = $conn->query($sql);

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

$conn->close();
?>
