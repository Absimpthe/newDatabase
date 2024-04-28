/* --- Modal to add new item --- */
var newItemModal = document.getElementById("new-item-modal");

var btn = document.getElementById("add-item"); // button to open modal
var span = document.getElementsByClassName("close")[0]; // element that closes the modal

// Modal variables
var newItemID = document.getElementById("new-item-id");
var newItemName = document.getElementById("new-item-name");
var newItemPrice = document.getElementById("new-item-price");
var newItemImage = document.getElementById("new-item-image");

btn.onclick = function() { // user clicks on button, open modal
  newItemModal.style.display = "block";
}

span.onclick = function() { // user clicks on (x), close modal
  newItemModal.style.display = "none";
}

var addItemForm = document.querySelector(".add-item-form");

// Listen for form submission
addItemForm.addEventListener("submit", function(e) {
    // Prevent the default form submission
    e.preventDefault();

    if (checkForm()) {
        sendData(addItemForm, "/admin/add_new_item.php", "new-item-modal");
    }
});

// Send the data to PHP file
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
            window.location.href="view_menu.html";
            // item successfully added
        }
        else {
            document.getElementById('login-error').innerText = data.message;
            showModal.style.display = 'block';  
            // if there is error in adding item
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('login-error').innerText = "An unexpected error occurred. Please try again.";
    });
}

function checkForm() {
    if (!newItemID.value || !newItemName.value || !newItemPrice.value || !newItemImage.value) {
        // Display error message if any field is empty
        document.getElementById('login-error').innerText = 'Please fill in all fields.';
        newItemModal.style.display = 'block';  
        return false; // Stop the function if any field is empty
    }
    return true;
}