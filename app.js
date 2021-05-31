const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

//username and password
const myusename = "user1";
const mypassword = "mypassword";

const PORT = 4000;
var session;
const app = express();

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// serving public file
app.use(express.static(__dirname));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.get("/", (req, res) => {
  if (req.session.userid) {
    res.send("welcome User <a href='/logout'>click to logout</a>");
  } else res.sendFile("views/index.html", { root: __dirname });
});

app.post("/user", (req, res) => {
  if (req.body.username === myusename && req.body.password === mypassword) {
    req.session.userid = req.body.username;
    res.redirect("/");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
