function getCurrentUser() {
  var token = localStorage.getItem('token');
  var users = JSON.parse(localStorage.getItem('users'));

  var currentUser = users.find(function(user) {
    return user.token === token;
  });

  return currentUser;
}

// Function to populate the form fields with user information
function populateFormFields() {
  var usernameField = document.getElementById('username');
  var emailField = document.getElementById('email');
  var phoneNumberField = document.getElementById('phoneNumber');

  var currentUser = getCurrentUser(); 

  if (currentUser) {
    usernameField.value = currentUser.username;
    emailField.value = currentUser.email;
    phoneNumberField.value = currentUser.phoneNumber;
  }
}

window.addEventListener('load', populateFormFields);

document.getElementById('petRescuerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve the current user's information from local storage 
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var petName = document.getElementById('petName').value;
  var petType = document.getElementById('petType').value;
  var petBreed = document.getElementById('petBreed').value;
  var petAge = document.getElementById('petAge').value;
  var petDescription = document.getElementById('petDescription').value;

  var token = localStorage.getItem('token');

  var contactInfo = {
    token: token,
    username: username,
    email: email,
    phoneNumber: phoneNumber
  };
  saveContactInfo(token, contactInfo);

  let id;
  var petInfoList = JSON.parse(localStorage.getItem('petInfoList')) || [];

  petInfoList.length === 0? id = 0 : id = (petInfoList[petInfoList.length - 1].id) + 1;

  var contactInfo = {
    id: id,
    token: token,
    username: username,
    email: email,
    phoneNumber: phoneNumber
  };
  saveContactInfo(id, contactInfo);

  var petInfo = {
    id : id,
    petName: petName,
    petType: petType,
    petBreed: petBreed,
    petAge: petAge,
    petDescription: petDescription,
    token: token
  };
  savePetInfo(petInfo);

  document.getElementById('petRescuerForm').reset();

  alert('Form submitted successfully!');
  window.location.href = 'findpet.html';
});

function saveContactInfo(token, contactInfo) {
  var contactInfoList = JSON.parse(localStorage.getItem('contactInfoList')) || [];
  contactInfoList.push(contactInfo);
  localStorage.setItem('contactInfoList', JSON.stringify(contactInfoList));
}

function savePetInfo(petInfo) {
  var token = localStorage.getItem("token"); 

  var petInfoList = JSON.parse(localStorage.getItem("petInfoList")) || [];

  var id = petInfoList.length > 0 ? petInfoList[petInfoList.length - 1].id + 1 : 0;

  petInfo.id = id;
  petInfo.token = token;

  petInfoList.push(petInfo);
  localStorage.setItem("petInfoList", JSON.stringify(petInfoList));
}
