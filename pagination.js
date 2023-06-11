var petListContainer = document.getElementById("petListContainer");

var paginationContainer = document.getElementById("paginationContainer");

var petsPerPage = 1;
var currentPage = 1;

var totalPets = 0;
var totalPages = 0;

// Retrieve the current page value from local storage
var storedPage = localStorage.getItem("currentPage");
if (storedPage) {
  currentPage = parseInt(storedPage);
}

createPaginationLinks();
displayPage(currentPage);

// Function to display the specified page
function displayPage(page) {
  var startIndex = (page - 1) * petsPerPage;
  var endIndex = startIndex + petsPerPage - 1;

  var petItems = Array.from(petListContainer.children);

  petItems.forEach(function (petItem, index) {
    if (index >= startIndex && index <= endIndex) {
      petItem.style.display = "block";
    } else {
      petItem.style.display = "none";
    }
  });

  // Check if the current page is empty
  var currentPageItems = petItems.slice(startIndex, endIndex + 1);
  var isEmptyPage = currentPageItems.every(function (petItem) {
    return petItem.style.display === "none";
  });

  // If the current page is empty, navigate to the previous page
  if (isEmptyPage && currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
    updatePaginationLinks();
    saveCurrentPage();
  }
}

// Function to create the pagination links
function createPaginationLinks() {
  paginationContainer.innerHTML = "";

  var petItems = Array.from(petListContainer.children);
  totalPets = petItems.length;
  totalPages = Math.ceil(totalPets / petsPerPage);

  if (totalPets > 0) {
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

    paginationContainer.appendChild(previousLink);
    paginationContainer.appendChild(pageLinks);
    paginationContainer.appendChild(nextLink);
  }
}

// Function to update the pagination links based on the current page
function updatePaginationLinks() {
  var previousLink = paginationContainer.querySelector(".previous-link");
  var nextLink = paginationContainer.querySelector(".next-link");
  var pageLinks = paginationContainer.querySelectorAll(".page-links a");

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
