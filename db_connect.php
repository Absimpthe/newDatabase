<?php
$con = new mysqli("localhost", "root", "", "comp1044_database");

if ($con->connect_error) {
    die("Failed to connect: " . $con->connect_error);
}
?>