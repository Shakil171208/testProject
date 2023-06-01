function getUserByToken(token) {
  var users = JSON.parse(localStorage.getItem("users")) || [];

  for (var i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      return users[i];
    }
  }

  return null;
}



