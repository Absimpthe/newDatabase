/* --- Username modal --- */
var usernameModal = document.getElementById("username-modal");

var btn = document.getElementById("update-username"); // button to open modal
var span = document.getElementsByClassName("close")[0]; // element that closes the modal


btn.onclick = function() { // user clicks on button, open modal
  usernameModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  usernameModal.style.display = "none";
}

var updateUsernameForm = document.querySelector(".update-username-form");

// Listen for form submission
updateUsernameForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    sendData(updateUsernameForm, "update_username.php", "username-modal", 0);
    
});

/* --- password modal --- */
var passwordModal = document.getElementById("password-modal");

var btn = document.getElementById("update-password"); // button to open modal
var span = document.getElementsByClassName("close")[1]; // element that closes the modal


btn.onclick = function() { // user clicks on button, open modal
  passwordModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  passwordModal.style.display = "none";
}

var updatePasswordForm = document.querySelector(".update-password-form");

// Listen for form submission
updatePasswordForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    sendData(updatePasswordForm, "update_password.php", "password-modal", 1); 
});

/* --- email modal --- */
var emailModal = document.getElementById("email-modal");

var btn = document.getElementById("update-email"); // button to open modal
var span = document.getElementsByClassName("close")[2]; // element that closes the modal


btn.onclick = function() { // user clicks on button, open modal
  emailModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  emailModal.style.display = "none";
}

var updateEmailForm = document.querySelector(".update-email-form");

// Listen for form submission
updateEmailForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    sendData(updateEmailForm, "update_email.php", "email-modal", 2); 
});

/* --- home address modal --- */
var addressModal = document.getElementById("address-modal");

var btn = document.getElementById("update-address"); // button to open modal
var span = document.getElementsByClassName("close")[3]; // element that closes the modal


btn.onclick = function() { // user clicks on button, open modal
  addressModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  addressModal.style.display = "none";
}

var updateAddressForm = document.querySelector(".update-address-form");

// Listen for form submission
updateAddressForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    sendData(updateAddressForm, "update_address.php", "address-modal", 3); 
});

/* --- phone number modal --- */
var phoneNoModal = document.getElementById("phone-no-modal");

var btn = document.getElementById("update-phone-no"); // button to open modal
var span = document.getElementsByClassName("close")[4]; // element that closes the modal


btn.onclick = function() { // user clicks on button, open modal
  phoneNoModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  phoneNoModal.style.display = "none";
}

var updatePhoneNoForm = document.querySelector(".update-phone-no-form");

// Listen for form submission
updatePhoneNoForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    sendData(updatePhoneNoForm, "update_phone_no.php", "phone-no-modal", 4); 
});

/* --- end of modals --- */

function sendData(form, file, modal, number) {
    var formData = new FormData(form);
    var showModal = document.getElementById(modal);
    
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
            window.location.href="profile.html";
            // user successfully updates account detail(s)
        }
        else {
            document.getElementsByClassName('login-error')[number].innerText = data.message;
            showModal.style.display = 'block';  
            // if there is error in updating
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementsByClassName('login-error')[number].innerText = "An unexpected error occurred. Please try again.";
        // Handle errors
    });
}