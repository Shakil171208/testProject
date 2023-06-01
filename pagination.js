// Constants
const itemsPerPage = 2; // Number of pet items to show per page
let currentPage = 1; // Track the current page

// Load pet information and initialize pagination
window.addEventListener("DOMContentLoaded", function () {
  var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

  // Sort the pet info list by token to ensure consistent pagination
  petInfoList.sort(function (a, b) {
    return a.token.localeCompare(b.token);
  });

  // Calculate the total number of pages
  var totalPages = Math.ceil(petInfoList.length / itemsPerPage);

  // Get the current page from localStorage (if available) and set it as the currentPage
  var storedPage = localStorage.getItem("currentPage");
  currentPage = storedPage ? parseInt(storedPage) : 1;

  // Render the pet list and pagination for the current page
  renderPetListAndPagination(petInfoList, currentPage, totalPages);
});

// Update pet information
function updatePetInfo(petId, updatedPetInfo) {
  var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

  // Find the pet to update
  var petIndex = petInfoList.findIndex(function (pet) {
    return pet.id === petId;
  });

  if (petIndex !== -1) {
    // Update the pet information
    petInfoList[petIndex] = updatedPetInfo;
    localStorage.setItem("petInfoList", JSON.stringify(petInfoList));

    // Re-render the pet list and pagination using the current page
    var totalPages = Math.ceil(petInfoList.length / itemsPerPage);
    renderPetListAndPagination(petInfoList, currentPage, totalPages);
  }
}

// Render pet list and pagination based on current page
function renderPetListAndPagination(petInfoList, currentPage, totalPages) {
  // Calculate the start and end indexes of the pet items to display
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = Math.min(startIndex + itemsPerPage, petInfoList.length);

  var petListContainer = document.getElementById("petList");
  petListContainer.innerHTML = "";

  for (var i = startIndex; i < endIndex; i++) {
    var petInfo = petInfoList[i];
    var petItem = createPetItemElement(petInfo);
    petListContainer.appendChild(petItem);
  }

  renderPagination(currentPage, totalPages);
}

// Create pet item element
function createPetItemElement(petInfo) {
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

  var currentUserToken = localStorage.getItem("token");

  var editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  if (petInfo.token !== currentUserToken) {
    editButton.style.display = "none";
  }
  editButton.addEventListener(
    "click",
    createEditButtonClickHandler(petInfo.id)
  );

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  if (petInfo.token !== currentUserToken) {
    deleteButton.style.display = "none";
  }
  deleteButton.addEventListener(
    "click",
    createDeleteButtonClickHandler(petInfo.id)
  );

  var contactButton = document.createElement("button");
  contactButton.textContent = "Contact Me";
  contactButton.addEventListener(
    "click",
    createContactButtonClickHandler(petInfo.token)
  );

  petItem.appendChild(petName);
  petItem.appendChild(petType);
  petItem.appendChild(petBreed);
  petItem.appendChild(petAge);
  petItem.appendChild(petDescription);
  petItem.appendChild(editButton);
  petItem.appendChild(deleteButton);
  petItem.appendChild(contactButton);

  return petItem;
}

// Render pagination
function renderPagination(currentPage, totalPages) {
  var paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  // Render "Previous page" option if not in the first page
  if (currentPage > 1) {
    var prevPageLink = createPageLink("Previous page", currentPage - 1);
    paginationContainer.appendChild(prevPageLink);
  }

  // Render page numbers
  var pageNumbers = calculatePageNumbers(currentPage, totalPages);
  for (var i = 0; i < pageNumbers.length; i++) {
    var pageLink = createPageLink(pageNumbers[i], pageNumbers[i]);
    paginationContainer.appendChild(pageLink);
  }

  // Render "Next page" option if not in the last page
  if (currentPage < totalPages) {
    var nextPageLink = createPageLink("Next page", currentPage + 1);
    paginationContainer.appendChild(nextPageLink);
  }
}

// Create page link element
function createPageLink(text, page) {
  var pageLink = document.createElement("span");
  pageLink.textContent = text;
  pageLink.className = "page-link";
  pageLink.addEventListener("click", function () {
    changePage(page);
  });

  return pageLink;
}

// Calculate the array of page numbers to display in pagination
function calculatePageNumbers(currentPage, totalPages) {
  var pageNumbers = [];

  // Show up to 3 page numbers before the current page
  var startPage = Math.max(currentPage - 3, 1);
  for (var i = startPage; i < currentPage; i++) {
    pageNumbers.push(i);
  }

  // Show the current page number
  pageNumbers.push(currentPage);

  // Show up to 3 page numbers after the current page
  var endPage = Math.min(currentPage + 3, totalPages);
  for (var i = currentPage + 1; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
}

// Change the current page and re-render the pet list and pagination
function changePage(page) {
  var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];
  var totalPages = Math.ceil(petInfoList.length / itemsPerPage);

  if (page >= 1 && page <= totalPages) {
    currentPage = page; // Update the current page
    localStorage.setItem("currentPage", currentPage); // Store the current page in localStorage
    renderPetListAndPagination(petInfoList, currentPage, totalPages);
  }
}
