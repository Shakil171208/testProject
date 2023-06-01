document.addEventListener('DOMContentLoaded', function() {
  var signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var agreeTerms = document.getElementById('terms').checked;

    // Perform validation on the form fields
    if (!firstName || !lastName || !username || !email || !phoneNumber || !gender || !password || !confirmPassword || !agreeTerms) {
      alert('Please fill in all the fields and agree to the terms and conditions.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Retrieve existing users' data from local storage
    var storedUsers = localStorage.getItem('users');
    var users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if username, email, or phone number is already used
    var existingUser = users.find(function(user) {
      return user.username === username || user.email === email || user.phoneNumber === phoneNumber;
    });

    if (existingUser) {
      alert('Username, email, or phone number is already used. Please choose different credentials.');
      return;
    }

    // Generate a unique token for the user
    var token = createJWTToken(username);

    // Create a new user object with the form data and token
    var user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      gender: gender,
      password: password,
      token: token
    };

    // Push the new user object to the existing users array
    users.push(user);

    // Store the updated users array in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and redirect to login page
    var signupForm = document.getElementById('signupForm');
    signupForm.style.display = 'none';

    var loginMessage = document.getElementById('loginMessage');
    loginMessage.innerText = 'Signup successful! Please login.';
    loginMessage.style.display = 'block';
    window.location.href = 'login.html';
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
    var token = currentToken ? parseInt(currentToken) + 1 : 1;

    // Update the current token value in localStorage
    localStorage.setItem("currentToken", token);

    // Store the token for the user in localStorage
    localStorage.setItem(username + "_token", token.toString());

    return token.toString();
  }
}

