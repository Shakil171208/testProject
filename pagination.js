// Get the pet list container element
var petListContainer = document.getElementById("petListContainer");

// Get the pagination container element
var paginationContainer = document.getElementById("paginationContainer");

// Define the number of pets per page
var petsPerPage = 2;

// Initialize the current page
var currentPage = 1;

// Calculate the total number of pages
var totalPets = 0;
var totalPages = 0;

// Retrieve the current page value from local storage
var storedPage = localStorage.getItem("currentPage");
if (storedPage) {
  currentPage = parseInt(storedPage);
}

// Display the initial page
displayPage(currentPage);

// Create the pagination links
createPaginationLinks();

// Function to display the specified page
function displayPage(page) {
  // Calculate the range of pets to be displayed on the page
  var startIndex = (page - 1) * petsPerPage;
  var endIndex = startIndex + petsPerPage - 1;

  // Convert the children collection to an array
  var petItems = Array.from(petListContainer.children);

  // Loop through the pet items and update their display property
  petItems.forEach(function (petItem, index) {
    if (index >= startIndex && index <= endIndex) {
      petItem.style.display = "block";
    } else {
      petItem.style.display = "none";
    }
  });
}

// Function to create the pagination links
function createPaginationLinks() {
  // Clear the existing pagination links
  paginationContainer.innerHTML = "";

  // Calculate the total number of pets
  var petItems = Array.from(petListContainer.children);
  totalPets = petItems.length;
  totalPages = Math.ceil(totalPets / petsPerPage);

  // Create the previous page link
  var previousLink = document.createElement("a");
  previousLink.textContent = "Previous page";
  previousLink.classList.add("pagination-link");
  previousLink.classList.add("previous-link");
  if (currentPage === 1) {
    previousLink.style.display = "none";
  }
  previousLink.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      updatePaginationLinks();
      saveCurrentPage();
    }
  });

  // Create the next page link
  var nextLink = document.createElement("a");
  nextLink.textContent = "Next page";
  nextLink.classList.add("pagination-link");
  nextLink.classList.add("next-link");
  if (currentPage === totalPages) {
    nextLink.style.display = "none";
  }
  nextLink.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      updatePaginationLinks();
      saveCurrentPage();
    }
  });

  // Create the page number links
  var pageLinks = document.createElement("div");
  pageLinks.classList.add("page-links");

  for (var i = 1; i <= totalPages; i++) {
    var pageLink = document.createElement("a");
    pageLink.textContent = i;
    pageLink.classList.add("pagination-link");
    if (i === currentPage) {
      pageLink.classList.add("active");
    }
    pageLink.addEventListener("click", function () {
      currentPage = parseInt(this.textContent);
      displayPage(currentPage);
      updatePaginationLinks();
      saveCurrentPage();
    });

    pageLinks.appendChild(pageLink);
  }

  // Append the links to the pagination container
  paginationContainer.appendChild(previousLink);
  paginationContainer.appendChild(pageLinks);
  paginationContainer.appendChild(nextLink);
}

// Function to update the pagination links based on the current page
function updatePaginationLinks() {
  var previousLink = paginationContainer.querySelector(".previous-link");
  var nextLink = paginationContainer.querySelector(".next-link");
  var pageLinks = paginationContainer.querySelectorAll(".page-links a");

  // Update the visibility of previous and next links
  if (currentPage === 1) {
    previousLink.style.display = "none";
  } else {
    previousLink.style.display = "block";
  }

  if (currentPage === totalPages) {
    nextLink.style.display = "none";
  } else {
    nextLink.style.display = "block";
  }

  // Update the active page link
  for (var i = 0; i < pageLinks.length; i++) {
    var pageLink = pageLinks[i];
    if (parseInt(pageLink.textContent) === currentPage) {
      pageLink.classList.add("active");
    } else {
      pageLink.classList.remove("active");
    }
  }
}

// Function to save the current page value in local storage
function saveCurrentPage() {
  localStorage.setItem("currentPage", currentPage);
}

