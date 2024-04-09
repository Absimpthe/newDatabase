document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    // Get the button and the sign-up section elements
    const signUpButton = document.getElementById('showSignUp');
    const loginButton = document.getElementById('showLogin');
    const signUpSection = document.querySelector('.sign-up');
    const loginSection = document.querySelector('.login');
    const loginInsteadLink = document.getElementById('loginInsteadLink');
    const signupInsteadLink = document.getElementById('signupInsteadLink');

    loginButton.addEventListener("click", function() {
        if (loginSection.style.display === 'none' || loginSection.style.display === '') {
            loginSection.style.display = 'block';
            loginButton.style.display = 'none';
            signUpButton.style.display = 'none';
        } else {
            loginSection.style.display = 'none';
        }
    });
    var loginForm = document.querySelector(".login-form");
    // Add a click event listener to the button
    signUpButton.addEventListener("click", function() {
        // Check the current display style of the sign-up section and toggle it
        if (signUpSection.style.display === 'none' || signUpSection.style.display === '') {
        signUpSection.style.display = 'block'; // Show the sign-up section
        signUpButton.style.display = 'none'; // Hide the sign-up button
        loginButton.style.display = 'none'; // Hide the login button
        } else {
        signUpSection.style.display = 'none'; // Hide the sign-up section
        }
    });
    var signUpForm = document.querySelector(".sign-up-form");

    loginInsteadLink.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default anchor action

        // Hide the sign-up section and show the login section
        signUpSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    signupInsteadLink.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default anchor action

        signUpSection.style.display = 'block';
        loginSection.style.display = 'none';
    });

    // Listen for form submission
    signUpForm.addEventListener("submit", function(e) {
        // Prevent the default form submission
        e.preventDefault();

        // Validate the form
        if (validateForm()) {
            // If validation passes, send the data to the server
            sendData(signUpForm, "signup.php", "new_user.html", signUpSection, loginSection);
        }
    });

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        sendData(loginForm, "login.php", "test.php", loginSection, signUpSection);

    });

    function validateForm() {
        var username = document.getElementById("signup-username").value;
        var phoneNo = document.getElementById("phone-no").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var password = document.getElementById("signup-password").value;

        var valid = true;

        // Simple validation checks
        if (username.length === 0) {
            alert("Username cannot be empty");
            valid = false;
        }

        if (phoneNo.length === 0) {
            alert("Phone number cannot be empty");
            valid = false;
        }

        if (!validateEmail(email)) {
            alert("Invalid email format");
            valid = false;
        }

        if (address.length === 0) {
            alert("Address cannot be empty");
            valid = false;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters");
            valid = false;
        }

        return valid;
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function sendData(form, file, redirect, sectionShow, sectionHide) {
        var formData = new FormData(form);
        
        fetch(file, {
            method: "POST",
            body: formData
        })
        .then(response => {
            console.log("Received response", response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                window.location.href=redirect;
                // user logins and can use the menu
            }
            else {
                document.getElementById('login-error').innerText = data.message;
                sectionShow.style.display = 'block';
                sectionHide.style.display = 'none';  
                // if login details are incorrect
            }
    
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('login-error').innerText = "An unexpected error occurred. Please try again.";
            // Handle errors
        });
    }
});
