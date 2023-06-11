document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Retrieve users' data from local storage
    var storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      var users = JSON.parse(storedUsers);

      var user = users.find(function (user) {
        return user.username === username && user.password === password;
      });

      if (user) {

        var token = createJWTToken(user.username);

        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUsername", user.username);

        var successMessage = document.getElementById("successMessage");
        successMessage.innerText = "Login successful! Redirecting...";

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

  var storedToken = localStorage.getItem(username + "_token");

  if (storedToken) {

    return storedToken;
  } else {

    var currentToken = localStorage.getItem("currentToken");
    var token = currentToken ? parseInt(currentToken) : 1;

    localStorage.setItem("currentToken", token);

    localStorage.setItem(username + "_token", token.toString());

    return token.toString();
  }
}

