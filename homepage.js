document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    // Get the button and the sign-up section elements
    const signUpButton = document.getElementById('showSignUp');
    const loginButton = document.getElementById('showLogin');
    const signUpSection = document.querySelector('.sign-up');
    const loginSection = document.querySelector('.login');
    const loginInsteadLink = document.getElementById('loginInsteadLink');
    const signupInsteadLink = document.getElementById('signupInsteadLink');

    // display the login section
    loginButton.addEventListener("click", function() {
        if (loginSection.style.display === 'none' || loginSection.style.display === '') {
            loginSection.style.display = 'block'; // Show the login section
            loginButton.style.display = 'none'; // Hide the login button
            signUpButton.style.display = 'none'; // Hide the sign-up button
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
            sendData(signUpForm, "signup.php", signUpSection, loginSection, 0);
        }
    });

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        sendData(loginForm, "login.php", loginSection, signUpSection, 1);

    });

    // validation checks
    function validateForm() {
        var username = document.getElementById("signup-username").value;
        var phoneNo = document.getElementById("phone-no").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var password = document.getElementById("signup-password").value;

        var valid = true;

        // Simple validation checks

        // check if username input is empty
        if (username.length === 0) {
            alert("Username cannot be empty");
            valid = false;
        }

        // check if phone number input is empty
        if (phoneNo.length === 0) {
            alert("Phone number cannot be empty");
            valid = false;
        }

        // check if email input is correctly formatted
        if (!validateEmail(email)) {
            alert("Invalid email format");
            valid = false;
        }

        // check if address input is empty
        if (address.length === 0) {
            alert("Address cannot be empty");
            valid = false;
        }

        // check if password input is of the correct length
        if (password.length < 8) {
            alert("Password must be at least 8 characters");
            valid = false;
        }

        return valid;
    }

    // checks whether there is an @ and a . in the email input
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // sends data to the appropriate php file
    function sendData(form, file, sectionShow, sectionHide, number) {
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
            if (data.status === "success") { // the data has been successfully received, redirect user
                if (data.userType === 'Driver') { // checks if user is a driver
                    window.location.href = 'dashboard.html'; // redirects user to HTML file for drivers
                } else if (data.userType === 'Admin') { // checks if user is an admin
                    window.location.href = 'admin/admin_panel.html'; // redirects user to HTML file for admin
                } else { // user is a customer
                    window.location.href = 'main.html'; // redirects user to landing page
                }
            }
            else {
                // if error in retrieving data, display the error message to the user
                document.getElementsByClassName('login-error')[number].innerText = data.message;
                sectionShow.style.display = 'block';
                sectionHide.style.display = 'none';  
                // if user details are incorrect
            }
    
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementsByClassName('login-error')[number].innerText = "An unexpected error occurred. Please try again.";
            // Handle errors
        });
    }
});
