var currentUserToken = localStorage.getItem("token");
var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];
var contactInfoList = JSON.parse(localStorage.getItem("contactInfoList")) || [];
var petListContainer = document.getElementById("petListContainer");

petInfoList.forEach(function (petInfo) {
  var petItem = document.createElement("div");
  petItem.classList.add("pet-item");

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
  var deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
  deleteSelectedBtn.style.display = "none";
}

// Function to handle the "Delete Selected" button click
function deleteSelectedPets() {
  var checkboxes = document.getElementsByClassName("checkbox");
  var selectedPetIds = [];

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

  localStorage.setItem("petInfoList", JSON.stringify(updatedPetInfoList));
  location.reload();
}

function createEditButtonClickHandler(petId) {
  return function () {
    var petInfo = petInfoList.find(function (pet) {
      return pet.id === petId;
    });

    if (petInfo) {
      var modal = document.getElementById("editModal");
      var editForm = document.getElementById("editForm");

      editForm.elements.editPetName.value = petInfo.petName;
      editForm.elements.editPetType.value = petInfo.petType;
      editForm.elements.editPetBreed.value = petInfo.petBreed;
      editForm.elements.editPetAge.value = petInfo.petAge;
      editForm.elements.editPetDescription.value = petInfo.petDescription;

      editForm.onsubmit = function (event) {
        event.preventDefault();

        petInfo.petName = editForm.elements.editPetName.value;
        petInfo.petType = editForm.elements.editPetType.value;
        petInfo.petBreed = editForm.elements.editPetBreed.value;
        petInfo.petAge = editForm.elements.editPetAge.value;
        petInfo.petDescription = editForm.elements.editPetDescription.value;

        localStorage.setItem("petInfoList", JSON.stringify(petInfoList));
        modal.style.display = "none";
        location.reload();
      };

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

      petInfoList.splice(petIndex, 1);

      localStorage.setItem("petInfoList", JSON.stringify(petInfoList));
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
