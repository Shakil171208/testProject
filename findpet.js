window.addEventListener("DOMContentLoaded", function () {
  var currentUserToken = localStorage.getItem("token");
  var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

  var petListContainer = document.getElementById("petList");
  petListContainer.innerHTML = "";

  for (var i = 0; i < petInfoList.length; i++) {
    var petInfo = petInfoList[i];

    var petItem = document.createElement("div");
    petItem.className = "pet-item";

    var petName = document.createElement("h3");
    petName.textContent = petInfo.petName;

    var petType = document.createElement("p");
    petType.textContent = "Type: " + petInfo.petType;

    var petBreed = document.createElement("p");
    petBreed.textContent = "Breed: " + petInfo.petBreed;

    var petAge = document.createElement("p");
    petAge.textContent = "Age: " + petInfo.petAge;

    var petDescription = document.createElement("p");
    petDescription.textContent = "Description: " + petInfo.petDescription;

    var editButton = document.createElement("button");
editButton.innerHTML = '<i class="material-icons">edit</i>';
editButton.classList.add("icon-button");
editButton.addEventListener(
  "click",
  createEditButtonClickHandler(petInfo.token)
);


var deleteButton = document.createElement("button");
deleteButton.innerHTML = '<i class="material-icons">delete</i>';
deleteButton.classList.add("icon-button");
deleteButton.addEventListener(
  "click",
  createDeleteButtonClickHandler(petInfo.token)
);

    var contactButton = document.createElement("button");
    contactButton.textContent = "Contact Me";
    contactButton.addEventListener(
      "click",
      createContactButtonClickHandler(petInfo.token)
    );

    // Hide edit and delete buttons if the user is not the owner of the pet
    if (petInfo.token !== currentUserToken) {
      editButton.style.display = "none";
      deleteButton.style.display = "none";
    }

    petItem.appendChild(petName);
    petItem.appendChild(petType);
    petItem.appendChild(petBreed);
    petItem.appendChild(petAge);
    petItem.appendChild(petDescription);
    petItem.appendChild(editButton);
    petItem.appendChild(deleteButton);
    petItem.appendChild(contactButton);

    petListContainer.appendChild(petItem);
  }
});

function createEditButtonClickHandler(token) {
  return function () {
    var currentUserToken = localStorage.getItem("token");
    if (token === currentUserToken) {
      var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

      // Find the pet info to be edited
      var petInfo = petInfoList.find(function (pet) {
        return pet.token === token;
      });

      if (petInfo) {
        // Open a modal with a form for editing the pet data
        var modal = document.getElementById("editModal");
        var editForm = document.getElementById("editForm");

        // Pre-fill the form fields with the existing pet data
        editForm.elements.editPetName.value = petInfo.petName;
        editForm.elements.editPetType.value = petInfo.petType;
        editForm.elements.editPetBreed.value = petInfo.petBreed;
        editForm.elements.editPetAge.value = petInfo.petAge;
        editForm.elements.editPetDescription.value = petInfo.petDescription;

        // Submit handler for the edit form
        editForm.onsubmit = function (event) {
          event.preventDefault();

          // Update the pet data with the edited values
          petInfo.petName = editForm.elements.editPetName.value;
          petInfo.petType = editForm.elements.editPetType.value;
          petInfo.petBreed = editForm.elements.editPetBreed.value;
          petInfo.petAge = editForm.elements.editPetAge.value;
          petInfo.petDescription = editForm.elements.editPetDescription.value;

          // Save the updated pet info in local storage
          localStorage.setItem("petInfoList", JSON.stringify(petInfoList));

          // Close the modal
          modal.style.display = "none";

          // Reload the page to display the updated pet info
          location.reload();
        };

        // Show the edit modal
        modal.style.display = "block";

        // Close modal when clicking the close button
        var closeModal = modal.querySelector(".close-edit");
        closeModal.addEventListener("click", function () {
          modal.style.display = "none";
        });
      } else {
        alert("Pet information not found.");
      }
    } else {
      alert("You can only edit your own pet data.");
    }
  };
}

// Create a click handler for the delete button
function createDeleteButtonClickHandler(token) {
  return function () {
    var currentUserToken = localStorage.getItem("token");
    if (token === currentUserToken) {
      var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

      // Find the index of the pet info to be deleted
      var petIndex = petInfoList.findIndex(function (pet) {
        return pet.token === token;
      });

      if (petIndex !== -1) {
        // Remove the pet info from the list
        petInfoList.splice(petIndex, 1);

        // Save the updated pet info in local storage
        localStorage.setItem("petInfoList", JSON.stringify(petInfoList));

        // Reload the page to reflect the changes
        location.reload();
      } else {
        alert("Pet information not found.");
      }
    } else {
      alert("You can only delete your own pet data.");
    }
  };
}

// Create a click handler for the contact button
function createContactButtonClickHandler(token) {
  return function () {
    var contactInfo = getContactInfoByToken(token);
    if (contactInfo) {
      displayContactModal(contactInfo);
    } else {
      alert("Contact information not found.");
    }
  };
}

// Retrieve contact information by token
function getContactInfoByToken(token) {
  var contactInfoList =
    JSON.parse(localStorage.getItem("contactInfoList")) || [];

  for (var i = 0; i < contactInfoList.length; i++) {
    if (contactInfoList[i].token === token) {
      return contactInfoList[i];
    }
  }

  return null;
}

// Display contact modal with contact information
function displayContactModal(contactInfo) {
  var modal = document.getElementById("contactModal");
  var modalUsername = document.getElementById("modalUsername");
  var modalEmail = document.getElementById("modalEmail");
  var modalPhoneNumber = document.getElementById("modalPhoneNumber");

  modalUsername.textContent = contactInfo.username;
  modalEmail.textContent = contactInfo.email;
  modalPhoneNumber.textContent = contactInfo.phoneNumber;

  modal.style.display = "block";

  // Close contact modal
  var closeModal = document.getElementsByClassName("close")[0];
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
