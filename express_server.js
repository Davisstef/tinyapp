//Site Engines
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let cookieSession = require('cookie-session');
let bcrypt = require('bcryptjs');
let PORT = 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: "session",
  keys: ['lorem', 'ipsum'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.set("view engine", "ejs");

//Database
let users = {};
let urlDatabase = {};

//Randomize URLs
function randomString() {
  let text = '';
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//Get Requests
app.get("/", (req, res) => {
  res.redirect('/login');
});

app.get("/urls", (req, res) => {
  let user = users[req.session["user_id"]];
  if (user !== undefined) {
    let urls = {}
    for (let url in urlDatabase) {
    console.log(Object.values(url), url, urlDatabase[url])
    if (urlDatabase[url].userId === req.session.user_id) {
      urls[url] = urlDatabase[url]
    }
    }
    let templateVars = {
      urls: urls,
      user: user
    };
    res.render("urls_index", templateVars);
    return;
  } else {
    res.status(400);
    res.send("Sign in or sign up.");
  }
});

app.get("/urls/new", (req, res) => {
  for (let key in users) {
    if (users[req.session["user_id"]] === users[key]) {
      let templateVars = {
        user: users[req.session["user_id"]]
      };
      res.render("urls_new", templateVars);
      return;
    }
  }
  res.redirect('/login');
});

app.get("/u/:shortURL", (req, res) => {
  if (req.params.shortURL in urlDatabase) {
    let longURL = urlDatabase[req.params.shortURL].longURL;
    if (!longURL.startsWith ('http://') && !longURL.startsWith ('https://')) {
      longURL = "http://" + longURL
    }
    res.redirect(longURL);
  } else {
    res.status(400);
    res.send("Log in or sign up.");
  }
});

app.get("/register", (req, res) => {
  let user = users[req.session["user_id"]];
  let templateVars = {
    urls: urlDatabase,
    user: user
  };
  if (user !== undefined) {
    res.render("urls_index", templateVars);
    return;
  } else {
    res.render("register", templateVars);  
  }  
});

app.get("/urls/:id", (req, res) => {
  if (req.params.id in urlDatabase) {
    let templateVars = {
      shortURL: req.params.id,
      longURL: urlDatabase[req.params.id].longURL,
      user: users[req.session["user_id"]]
    };
    res.render("urls_show", templateVars);
  } else {
    let templateVars = {
      shortURL: req.params.id,
      user: users[req.session["user_id"]]
    };
    res.redirect("urls_new", templateVars);
  }
});

app.get("/login", (req, res) => {
  let user = users[req.session["user_id"]];
  let templateVars = {
    urls: urlDatabase,
    user: user
  };
  if (user !== undefined) {
    res.render("urls_index", templateVars);
    return;
  } else {
    res.render("login", templateVars);  
  }  
});

//Post Requests
app.post("/login", (req, res) => {
  let loginEmail = req.body.email;
  let loginPassword = req.body.password;
  for (let object in users) {
    let user = users[object];
    if (loginEmail && user.email === loginEmail && bcrypt.compareSync(loginPassword, user.password)) {
      req.session["user_id"] = user.id;
      res.redirect("/urls");
      return;
    }
  }
  res.status(403);
  res.send("Invalid password and email combination.");
});

app.post("/logout", (req, res) => {
  req.session = null;
  console.log("Successfully logged out!");
  res.redirect('/');
});

app.post("/urls", (req, res) => {
  let shortURL = randomString();
  let longURL = req.body.longURL;
  let urlTemplate = {
    userId: req.session.user_id,
    longURL: longURL
  };
  urlDatabase[shortURL] = urlTemplate;
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect('/urls/');
});

app.post("/urls/:id/update", (req, res) => {
  let shortURL = req.params.id;
  urlDatabase[shortURL].longURL = req.body.newLongURL;
  res.redirect('/urls');
});

app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let newUserID = randomString();
  for (let property in users) {
    if (email === users[property].email) {
      res.status(400).send("User email already exists!");
      return;
    }
  }
  if (!email || !password) {
    res.status(400);
    res.send("Please enter your email and password.");
    return;
  }
  let hashedPassword = bcrypt.hashSync(password, 10);
  users[newUserID] = {
    id: newUserID,
    email: email,
    password: hashedPassword
  };
  req.session["user_id"] = newUserID;
  res.redirect('/urls');
});

//Connection Confirmation
app.listen(PORT, () => {
  console.log(`TinyApp listening on port ${PORT}!`);
});