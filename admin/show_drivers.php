<?php
session_start();
header('Content-Type: application/json');

require_once '../db_connect.php';

// Assume userID is passed via session or another method, validate it
if (!isset($_SESSION['user-id']) || empty($_SESSION['user-id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User ID not provided.']);
    exit();
}

$userId = $_SESSION['user-id'];

// Prepare statement for fetching drivers from users table
$stmt_user_drivers = $con->prepare("SELECT * FROM users WHERE UserType = 'Driver'");
$stmt_user_drivers->execute();
$stmt_user_drivers_result = $stmt_user_drivers->get_result();

$drivers = [];
$driver_details = [];

// Check if there are results
if ($stmt_user_drivers_result->num_rows > 0) {
    while ($driver = $stmt_user_drivers_result->fetch_assoc()) {
        // Use the correct field name for the user ID
        $driverID = $driver['UserID']; 

        // Prepare statement for fetching items for this specific order
        $stmt_driver = $con->prepare("SELECT * FROM drivers WHERE DriverID = ?");
        $stmt_driver->bind_param("s", $driverID);
        $stmt_driver->execute();
        $stmt_driver_result = $stmt_driver->get_result();

        // Fetch driver details
        $driver_details = $stmt_driver_result->fetch_assoc();

        // Add to the driver details only if they are found
        $driver['Details'] = $driver_details;

        // Add order to orders array
        $drivers[] = $driver;
    }

    echo json_encode(['status' => 'success', 'data' => $drivers]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No orders found for the user.']);
}

exit();
?>