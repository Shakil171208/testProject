var filteredPets = [];

// Function to perform the search based on pet type and pet age
function performSearch() {
  // Get the search input values
  var typeInput = document.getElementById("searchPetType").value.toLowerCase();
  var ageInput = document.getElementById("searchPetAge").value.toLowerCase();

  // Check if both search fields are empty
  if (typeInput === "" && ageInput === "") {
    return; // Use the original pet info list
  } else {
    // Filter the pet info list based on the search criteria
    filteredPets = petInfoList.filter(function (petInfo) {
      var petType = petInfo.petType.toLowerCase();
      var petAge = petInfo.petAge.toString().toLowerCase();

      // Check if the pet type and age match the search inputs
      return petType.includes(typeInput) && petAge.includes(ageInput);
    });
  }

  // Add an event listener to the "Delete Selected" button
  var deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
  deleteSelectedBtn.addEventListener("click", deleteSelectedPets);

  // Update the visibility of pagination links and delete button
  if (filteredPets.length === 0) {
    paginationContainer.style.display = "none";
    deleteSelectedBtn.style.display = "none";
  } else {
    paginationContainer.style.display = "block";
    deleteSelectedBtn.style.display = "block";
  }

  // Clear the pet list container
  petListContainer.innerHTML = "";

  // Display the filtered pets
  filteredPets.forEach(function (petInfo) {
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

  // Update the pagination links after performing the search
  var totalPages = Math.ceil(filteredPets.length / petsPerPage);
  createPaginationLinks(totalPages);
  displayPage(currentPage);
}

// Add an event listener to the search button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
  performSearch(); // Perform the search
});


