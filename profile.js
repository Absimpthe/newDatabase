// Get the modal
var modal = document.getElementById("username-modal");

// Get the button that opens the modal
var btn = document.getElementById("update-username");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var updateUsernameForm = document.querySelector(".update-username-form");

// Listen for form submission
updateUsernameForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    sendData(updateUsernameForm, "update_username.php", "username-modal");
    
});

function sendData(form, file, modal) {
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
            document.getElementById('login-error').innerText = data.message;
            showModal.style.display = 'block';  
            // if there is error in updating
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('login-error').innerText = "An unexpected error occurred. Please try again.";
        // Handle errors
    });
}