function randomString() {
  let text = '';
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const cookieHasUser = function(cookie, users) {
  for (const user in users) {
    if (cookie === user) {
      return true;
    }
  } return false;
};

const emailHasUser = function(email, users) {
  for (const user in users) {
    if (users[user].email === email) {
      return true;
    }
  }
  return false;
};

const userIdFromEmail = function(email, users) {
  for (const user in users) {
    if (users[user].email === email) {
      return users[user].id;
    }
  }
};

const urlsForUser = function(id, urlDatabase) {
  const userUrls = {};
  for (const shortURL in urlDatabase) {
    if (urlDatabase[shortURL].userId === id) {
      userUrls[shortURL] = urlDatabase[shortURL];
    }
  }
  return userUrls;
};

module.exports = {
  cookieHasUser,
  randomString,
  emailHasUser,
  userIdFromEmail,
  urlsForUser
}
