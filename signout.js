document.addEventListener("DOMContentLoaded", function() {
    
  var loggedInUsername = localStorage.getItem("loggedInUsername");
  
  // Remove the user's token and logged-in username from local storage
  localStorage.removeItem("token");
  localStorage.removeItem(loggedInUsername + "_token");
  localStorage.removeItem("loggedInUsername");
    
    setTimeout(function() {
      window.location.href = "index.html";
    }, 200);
  });
  