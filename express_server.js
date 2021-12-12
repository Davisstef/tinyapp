//Site Engines
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let cookieSession = require('cookie-session');
let bcrypt = require('bcryptjs');
let PORT = 8080;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieSession({
    name: 'session',
    keys: ['Stefan'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.set("view engine", "ejs");

//Database
let users = {};
let urlDatabase = {};

//Randomize URLs
const { randomString, cookieHasUser, emailHasUser, userIdFromEmail, urlsForUser } = require('./helpers');

//Get Requests
app.get("/", (req, res) => {
  if (cookieHasUser(req.session.user_id, users)) {
    res.redirect("/urls");
  } else {
    res.redirect("/login");
  }
});

app.get("/urls", (req, res) => {
  if (!cookieHasUser(req.session.user_id, users)) {
    res.redirect("/login");
  } else {
    let templateVars = {
      urls: urlsForUser(req.session.user_id, urlDatabase),
      user: users[req.session.user_id],
    };
    res.render("urls_index", templateVars);
  }
});

app.get("/urls/new", (req, res) => {
  if (!cookieHasUser(req.session.user_id, users)) {
    res.redirect("/login");
  } else {
    let templateVars = {
      user: users[req.session.user_id],
    };
    res.render("urls_new", templateVars);
  }
});

app.get("/u/:shortURL", (req, res) => {
  if (!cookieHasUser(req.session.user_id, users)) {
    res.status(404).send("Please log in.");
  } else if (urlDatabase[req.params.shortURL]) {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    if (longURL === undefined) {
      res.status(302);
    } else {
      res.redirect(longURL);
    }
  } else {
    res.status(404).send("Cannot get URL.");
  }
});

app.get("/register", (req, res) => {
  if (cookieHasUser(req.session.user_id, users)) {
    res.redirect("/urls");
  } else {
    let templateVars = {
      user: users[req.session.user_id],
    };
    res.render("urls_registration", templateVars);
  }
});

app.get("/urls/:shortURL", (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    res.status(404).send("This URL does not exist.");
  } else if (!cookieHasUser(req.session.user_id, users)) {
    res.status(404).send("Please log in.");
  } else if (urlDatabase[req.params.shortURL]) {
    let templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL].longURL,
      urlUserID: urlDatabase[req.params.shortURL].userId,
      user: users[req.session.user_id]
    };
    res.render("urls_show", templateVars);
  } else {
    res.status(404).send("Cannot get URL.");
  };
  if (userId !== urlDatabase[req.params.shortURL].userId) {
    return res.status(401).send("You do not have the permission to access this page.");
  }
});

app.get("/login", (req, res) => {
  if (cookieHasUser(req.session.user_id, users)) {
    res.redirect("/urls");
  } else {
    let templateVars = {
      user: users[req.session.user_id],
    };
    res.render("urls_login", templateVars);
  }
});

//Post Requests
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!emailHasUser(email, users)) {
    res.status(403).send("Account does not exist.");
  } else {
    const userId = userIdFromEmail(email, users);
    if (!bcrypt.compareSync(password, users[userId].password)) {
      res.status(403).send("The password you entered is invalid.");
    } else {
      req.session.user_id = userId;
      res.redirect("/urls");
    }
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/');
});

app.post("/urls", (req, res) => {
  let shortURL = randomString();
  let longURL = req.body.longURL;
  if (!longURL.startsWith ('http://') && !longURL.startsWith ('https://')) {
    longURL = "https://" + longURL
  };
  let urlTemplate = {
    userId: req.session.user_id,
    longURL: longURL
  };
  urlDatabase[shortURL] = urlTemplate;
  res.redirect(`/urls/${shortURL}`);
}); 

app.post("/urls/:shortURL/delete", (req, res) => {
  const userId = req.session.user_id;
  const userUrls = urlsForUser(userId, urlDatabase);
  if (Object.keys(userUrls).includes(req.params.shortURL)) {
    const shortURL = req.params.shortURL;
    delete urlDatabase[shortURL];
    res.redirect('/urls');
  } else {
    res.status(401).send("Please log in to delete URLs.");
  }
});

app.post("/urls/:id", (req, res) => {
  const userId = req.session.user_id;
  const userUrls = urlsForUser(userId, urlDatabase);
  let longURL = req.body.longURL;
  if (!longURL.startsWith ('http://') && !longURL.startsWith ('https://')) {
    longURL = "https://" + longURL
  };
  if (Object.keys(userUrls).includes(req.params.id)) {
    const shortURL = req.params.id;
    urlDatabase[shortURL].longURL = longURL;
    res.redirect('/urls');
  } else if (req.params.id !== userUrls) {
  res.status(400).send("You are not logged in.");
  } else if (!userId) {
  return res.status(401).send("You do not have the permission to access this page.");
  }
});


app.post("/register", (req, res) => {
  const submittedEmail = req.body.email;
  const submittedPassword = req.body.password;
  if (!submittedEmail || !submittedPassword) {
    res.status(400).send("Please enter your email and password");
  } else if (emailHasUser(submittedEmail, users)) {
    res.status(400).send("Account already exists!");
  } else {
    const newUserId = randomString();
    users[newUserId] = {
      id: newUserId,
      email: submittedEmail,
      password: bcrypt.hashSync(submittedPassword, 10),
    };
    req.session.user_id = newUserId;
    res.redirect("/urls");
  }
});

//Connection Confirmation
app.listen(PORT, () => {
    console.log(`TinyApp listening on port ${PORT}!`);
});