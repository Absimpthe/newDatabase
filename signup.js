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
        var firstName = document.getElementById("first-name").value;
        var lastName = document.getElementById("last-name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("Password").value;

        var valid = true;

        // Simple validation checks
        if (firstName.length === 0) {
            alert("First name cannot be empty");
            valid = false;
        }

        if (lastName.length === 0) {
            alert("Last name cannot be empty");
            valid = false;
        }

        if (!validateEmail(email)) {
            alert("Invalid email format");
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
