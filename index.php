<?php
  session_start();

  require_once 'db_connect.php'; // connect to database
  
  // checks whether there is already a user logged into the session
  if (!empty($_SESSION['user-id'])) {
    // redirects user to the correct HTML file
    switch ($_SESSION['user-type']) {
      case 'Admin':
        header("Location: admin/admin_panel.html");
        break;
      case 'Driver':
        header("Location: dashboard.html");
        break;
      case 'Customer':
        header("Location: menu.html");
        break;
      default:
        header("Location: index.php");
        break;
    }
  }
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nottingham Cafe</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
</head>

<body>
  <main>
    <!-- intro section -->
    <section class="intro">
      <h1 class="title">Welcome to Nottingham Cafe</h1>
      <p>Login to place your order</p>
    </section>
    <section class="homepage">
      <homepage-buttons>
        <button id="showLogin">Login</button>
        <button id="showSignUp">Sign Up</button>
      </homepage-buttons>

      <!-- Sign up form -->
      <section class="sign-up">
        <form action="signup.php" method="post" class="sign-up-form">
          <div class="form-input">
              <input type="text" name="signup-username" id="signup-username" placeholder="Username" required>
            </div>
    
            <div class="form-input">
              <input type="number" name="phone-no" id="phone-no" placeholder="Phone Number" required>
            </div>
    
            <div class="form-input">
              <input type="email" name="email" id="email" placeholder="Email Address" required>
            </div>

            <div class="form-input">
              <input type="text" name="address" id="address" placeholder="Home Address" required>
            </div>
    
            <div class="form-input">
              <input type="password" name="signup-password" id="signup-password" placeholder="Password" required>
            </div>
    
            <input class="submit-btn" type="submit" value="Create Account">

            <div class="login-error" id="login-error"></div>
            
            <p class="form-term">Already have an account? <a href="#login" id="loginInsteadLink">Login instead</a></p>
        </form>
      </section>

      <!-- Login form -->
      <section class="login">
        <form action="login.php" method="post" class="login-form">
          <div class="form-input">
            <input type="text" name="login-username" id="login-username" placeholder="Username" required>
          </div>
          <div class="form-input">
            <input type="password" name="login-password" id="login-password" placeholder="Password" required>
          </div>
          <input class="submit-btn" type="submit" value="Login">
          <div class="login-error" id="login-error"></div>
          <p class="form-term">Don't have an account yet? <a href="#sign-up" id="signupInsteadLink">Sign up instead</a></p>
        </form>
      </section>
    </section>
  </main>
  <script src="homepage.js"></script>

</body>

</html>

