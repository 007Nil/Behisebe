var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const cookieParser = require("cookie-parser");
const expressSession = require('express-session');

const staticRoutes = require("./view_controller/StaticRoutes.js");
const settingsRouter = require("./view_controller/SettingRoutes");
const bankRouter = require("./rest_controller/BankController");
const loginRouter = require("./view_controller/LoginRouter");

const oneDay = 1000 * 60 * 60 * 24;

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// ------ Set Session ---------------------
// This is for Prod
/*
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
},));
*/

// This is for testing env

app.use(expressSession({
  secret: "cats",
  saveUninitialized: false, // don't create session until something is stored
  resave: false, //don't save session if unmodified
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000, // In milliseconds. 5 Days in total.
    httpOnly: true
  },
}), (req, res, next) => {
  // Initialise default variables on the session object
  if (typeof req.session.initialisedSession === "undefined") {
    req.session.initialisedSession = true,
      req.session.userData = {
        ID: 1,
        FirstName: 'Sagnik',
        LastName: 'Sarkar',
        Email: 'sagniksarkar@ymail.com'
      }
  }
  next();
});

// cookie parser middleware
app.use(cookieParser());
// ------ For app development set demo values for session --------

// ------ All Routes for pages -------------
app.use("/", staticRoutes);
app.use("/settings", settingsRouter);
app.use("/", loginRouter);

// ------------- Rest Routes -----------------

app.use("/v1/bank", bankRouter);

// Without middleware
app.get('/', function (req, res) {
  res.redirect('/login');
});

app.listen(3000, function () {
  console.log('Alpha app listening on port 3000!');
});