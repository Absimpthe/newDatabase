/* --- modal --- */
var addDriverModal = document.getElementById("add-driver-modal"); // get the modal

var btn = document.getElementById("add-btn"); // button to open modal
var span = document.getElementsByClassName("close")[0]; // element that closes the modal


btn.onclick = function() { // user clicks on button, open modal
  addDriverModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  addDriverModal.style.display = "none";
}

var addDriverForm = document.querySelector(".add-driver-form"); 

// Listen for form submission
addDriverForm.addEventListener("submit", function(e) { 
    // Prevent the default form submission
    e.preventDefault();

    sendData(addDriverForm, "add_driver.php", "add-driver-modal", 0);
    
});

// Sends data to PHP 
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
            window.location.href="view_drivers.html";
            // user successfully adds driver details
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
    });
}