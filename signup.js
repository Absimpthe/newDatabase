document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    var signUpForm = document.querySelector(".sign-up-form");

    // Listen for form submission
    signUpForm.addEventListener("submit", function(e) {
        // Prevent the default form submission
        e.preventDefault();

        // Validate the form
        if (validateForm()) {
            // If validation passes, send the data to the server
            sendData();
        }
    });

    function validateForm() {
        var username = document.getElementById("username").value;
        var phoneNo = document.getElementById("phone-no").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var password = document.getElementById("password").value;

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

    function sendData() {
        var formData = new FormData(signUpForm);

        // Example of sending form data to a server using fetch
        fetch("your-server-endpoint", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle success, such as displaying a success message or redirecting the user
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors, such as displaying an error message to the user
        });
    }
});
