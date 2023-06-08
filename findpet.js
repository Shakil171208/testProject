// Retrieve the current user's token from local storage
var currentUserToken = localStorage.getItem("token");

// Retrieve the pet info list from local storage
var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

// Retrieve the contact info list from local storage
var contactInfoList = JSON.parse(localStorage.getItem("contactInfoList")) || [];

// Get the pet list container element
var petListContainer = document.getElementById("petListContainer");

// Loop through the pet info list and display each pet's information
petInfoList.forEach(function (petInfo) {
  // Create a new pet item element
  var petItem = document.createElement("div");
  petItem.classList.add("pet-item");

  // Create elements to display the pet information
  var petName = document.createElement("h2");
  petName.textContent = "Name: " + petInfo.petName;

  var petType = document.createElement("p");
  petType.textContent = "Type: " + petInfo.petType;

  var petBreed = document.createElement("p");
  petBreed.textContent = "Breed: " + petInfo.petBreed;

  var petAge = document.createElement("p");
  petAge.textContent = "Age: " + petInfo.petAge;

  var petDescription = document.createElement("p");
  petDescription.textContent = "Description: " + petInfo.petDescription;

  // Create an edit button for the pet item
  var editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.classList.add("icon-button");
  editButton.addEventListener(
    "click",
    createEditButtonClickHandler(petInfo.id)
  );

  // Create a delete button for the pet item
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add("icon-button");
  deleteButton.addEventListener(
    "click",
    createDeleteButtonClickHandler(petInfo.id)
  );

  // Create a contact button for the pet item
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

  if (petInfo.token == currentUserToken) {
    contactButton.style.display = "none";
  }

  // Create a checkbox for selecting the pet item
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.value = petInfo.id;

  // Append all the elements to the pet item container
  if (petInfo.token === currentUserToken) {
    petItem.appendChild(checkbox);
  }
  petItem.appendChild(petName);
  petItem.appendChild(petType);
  petItem.appendChild(petBreed);
  petItem.appendChild(petAge);
  petItem.appendChild(petDescription);
  petItem.appendChild(editButton);
  petItem.appendChild(deleteButton);
  petItem.appendChild(contactButton);

  // Append the pet item to the pet list container
  petListContainer.appendChild(petItem);
});

// Add an event listener to the "Delete Selected" button
var deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
deleteSelectedBtn.addEventListener("click", deleteSelectedPets);

// Check if the current logged-in user has any pet data
var userHasPetData = petInfoList.some(function (pet) {
  return pet.token === currentUserToken;
});

// Add an event listener to the "Delete Selected" button if the user has pet data
if (userHasPetData) {
  var deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
  deleteSelectedBtn.addEventListener("click", deleteSelectedPets);
} else {
  // Hide the "Delete Selected" button if the user doesn't have any pet data
  var deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
  deleteSelectedBtn.style.display = "none";
}

// Function to handle the "Delete Selected" button click
function deleteSelectedPets() {
  var checkboxes = document.getElementsByClassName("checkbox");
  var selectedPetIds = [];

  // Loop through the checkboxes to find the selected pets
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedPetIds.push(parseInt(checkboxes[i].value));
    }
  }

  if (selectedPetIds.length === 0) {
    alert("Please select at least one pet to delete.");
    return;
  }

  var updatedPetInfoList = petInfoList.filter(function (pet) {
    return !selectedPetIds.includes(pet.id) || pet.token !== currentUserToken;
  });

  if (updatedPetInfoList.length === petInfoList.length) {
    alert("You can only delete your own pet data.");
    return;
  }

  // Save the updated pet info in local storage
  localStorage.setItem("petInfoList", JSON.stringify(updatedPetInfoList));

  // Reload the page to reflect the changes
  location.reload();
}

// Function to create the edit button click handler
function createEditButtonClickHandler(petId) {
  return function () {
    var petInfo = petInfoList.find(function (pet) {
      return pet.id === petId;
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
  };
}

// Function to create the delete button click handler
function createDeleteButtonClickHandler(petId) {
  return function () {
    var petIndex = petInfoList.findIndex(function (pet) {
      return pet.id === petId;
    });

    if (petIndex !== -1) {
      var petInfo = petInfoList[petIndex];

      if (petInfo.token !== currentUserToken) {
        alert("You can only delete your own pet data.");
        return;
      }

      // Remove the pet info from the list
      petInfoList.splice(petIndex, 1);

      // Save the updated pet info in local storage
      localStorage.setItem("petInfoList", JSON.stringify(petInfoList));

      // Reload the page to reflect the changes
      location.reload();
    } else {
      alert("Pet information not found.");
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
