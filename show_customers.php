<?php
session_start();
header('Content-Type: application/json');

require_once 'db_connect.php'; 

// Prepare statement for fetching customers of type 'Customer'
$stmtCustomers = $con->prepare("SELECT UserID, Username, Address, EmailAddress, PhoneNumber FROM users WHERE UserType = ?");

$customerType = 'Customer';
$stmtCustomers->bind_param("s", $customerType);
$stmtCustomers->execute();
$stmt_resultCustomers = $stmtCustomers->get_result();

$customers = [];

// Check if there are results
if ($stmt_resultCustomers->num_rows > 0) {
    while($customer = $stmt_resultCustomers->fetch_assoc()) {
        $customers[] = $customer;
    }

    echo json_encode(['status' => 'success', 'data' => $customers]);
} else {
    echo json_encode(['status' => 'failure', 'message' => 'No registered customers found.']);
}

exit();

?>
