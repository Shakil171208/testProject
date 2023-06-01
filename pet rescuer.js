document.getElementById('petRescuerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var petName = document.getElementById('petName').value;
  var petType = document.getElementById('petType').value;
  var petBreed = document.getElementById('petBreed').value;
  var petAge = document.getElementById('petAge').value;
  var petDescription = document.getElementById('petDescription').value;

  // Retrieve the current token from local storage
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

  petInfoList.length === 0? id=0: id = (petInfoList[petInfoList.length - 1].id) + 1

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
  var token = localStorage.getItem('token'); // Retrieve the current user's token

  var petInfoList = JSON.parse(localStorage.getItem('petInfoList')) || [];
  
  // Update the token value in the petInfo object
  petInfo.token = token;

  petInfoList.push(petInfo);
  localStorage.setItem('petInfoList', JSON.stringify(petInfoList));
}