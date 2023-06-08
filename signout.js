document.addEventListener("DOMContentLoaded", function() {
    // Remove the user's token from local storage
    localStorage.removeItem("token");
    
    // Redirect to the index.html page after a short delay
    setTimeout(function() {
      window.location.href = "index.html";
    }, 1000);
  });
  