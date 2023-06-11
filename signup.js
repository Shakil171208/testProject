document.addEventListener('DOMContentLoaded', function() {
  var signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

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

    var storedUsers = localStorage.getItem('users');
    var users = storedUsers ? JSON.parse(storedUsers) : [];

    var existingUser = users.find(function(user) {
      return user.username === username || user.email === email || user.phoneNumber === phoneNumber;
    });

    if (existingUser) {
      alert('Username, email, or phone number is already used. Please choose different credentials.');
      return;
    }

    var token = createJWTToken(username);

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

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    var signupForm = document.getElementById('signupForm');
    signupForm.style.display = 'none';

    var loginMessage = document.getElementById('loginMessage');
    loginMessage.innerText = 'Signup successful! Please login.';
    loginMessage.style.display = 'block';
    window.location.href = 'login.html';
  });
});

function createJWTToken(username) {

  var storedToken = localStorage.getItem(username + "_token");

  if (storedToken) {
    return storedToken;
  } else {
    var currentToken = localStorage.getItem("currentToken");
    var token = currentToken ? parseInt(currentToken) + 1 : 1;

    localStorage.setItem("currentToken", token);
    localStorage.setItem(username + "_token", token.toString());
    return token.toString();
  }
}

