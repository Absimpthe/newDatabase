<?php

// file to be called whenever it is needed to access the database

$con = new mysqli("localhost", "root", "", "comp1044_database"); // create connection to database

if ($con->connect_error) {
    die("Failed to connect: " . $con->connect_error); // if failed, display error message
}
?>