<?php
    session_start();
    require_once 'db_connect.php';

    $_SESSION = array();

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Destroy the session
    session_destroy();

    // Redirect to start page
    echo "You have been logged out. Redirecting to home page...";
    header("Refresh: 2; url=./");

    exit();

?>