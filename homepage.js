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
            sendData(signUpForm, "signup.php", signUpSection, loginSection, 0);
        }
    });

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        sendData(loginForm, "login.php", loginSection, signUpSection, 1);

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
            if (data.status === "success") {
                if (data.userType === 'Driver') {
                    window.location.href = 'dashboard.html'; // HTML file for drivers
                } else {
                    window.location.href = 'main.html'; // HTML file for customers
                }
            }
            else {
                document.getElementsByClass('login-error')[number].innerText = data.message;
                sectionShow.style.display = 'block';
                sectionHide.style.display = 'none';  
                // if user details are incorrect
            }
    
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementsByClass('login-error')[number].innerText = "An unexpected error occurred. Please try again.";
            // Handle errors
        });
    }

    function showErrorPopup(message) {
        const popup = document.createElement('div');
        popup.setAttribute('id', 'errorPopup');
        popup.style.position = 'fixed';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.padding = '20px';
        popup.style.color = 'white';
        popup.style.background = '#d485c6';
        popup.style.zIndex = '1000';
        popup.style.borderRadius = '8px';
        popup.style.transition = 'opacity 0.5s ease';

        popup.style.opacity = '1'; // Start fully visible
        const messageText = document.createTextNode(message);
        popup.appendChild(messageText);

        document.body.appendChild(popup);

        // Fade out after 3 seconds
        setTimeout(() => {
            popup.style.opacity = '0';
            // Remove from DOM after transition
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 500); // Matches the transition time
        }, 3000); 
    }
});
