document.addEventListener("DOMContentLoaded", function() {
    
  var loggedInUsername = localStorage.getItem("loggedInUsername");
  
  // Remove the user's token and logged-in username from local storage
  localStorage.removeItem("token");
  localStorage.removeItem(loggedInUsername + "_token");
  localStorage.removeItem("loggedInUsername");
    
    // Redirect to the index.html page after a short delay
    setTimeout(function() {
      window.location.href = "index.html";
    }, 200);
  });
  