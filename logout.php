<?php
    session_start();
    require_once 'db_connect.php';

    $_SESSION = array();

    // Destroy the session
    session_destroy();

    // Redirect to start page
    header("Location: index.php");
    exit();

?>