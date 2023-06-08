document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Retrieve users' data from local storage
    var storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      var users = JSON.parse(storedUsers);

      // Find the user with the matching username and password
      var user = users.find(function (user) {
        return user.username === username && user.password === password;
      });

      if (user) {
        // Create JWT token for the user
        var token = createJWTToken(user.username);

        // Save token to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUsername", user.username);

        // Show success message
        var successMessage = document.getElementById("successMessage");
        successMessage.innerText = "Login successful! Redirecting...";

        // Redirect to a protected page (e.g., index.html) after a short delay
        setTimeout(function () {
          window.location.href = "index.html";
        }, 1000); 
      } else {
        alert("Invalid username or password");
      }
    } else {
      alert("User does not exist");
    }
  });
});

function createJWTToken(username) {
  // Retrieve the token for the user from localStorage
  var storedToken = localStorage.getItem(username + "_token");

  if (storedToken) {
    // Return the existing token
    return storedToken;
  } else {
    // Generate a new token
    var currentToken = localStorage.getItem("currentToken");
    var token = currentToken ? parseInt(currentToken) : 1;

    // Update the current token value in localStorage
    localStorage.setItem("currentToken", token);

    // Store the token for the user in localStorage
    localStorage.setItem(username + "_token", token.toString());

    return token.toString();
  }
}

