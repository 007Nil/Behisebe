const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const crypto = require("crypto");

const transactionRoutes = require("./view_controller/TransactionRoutes.js");
const settingsRouter = require("./view_controller/SettingRoutes");
const loginRouter = require("./view_controller/LoginRouter");
const dashboardRouter = require("./view_controller/DashboardRouter");
//  Rest Router
const bankRouter = require("./rest_controller/BankController");
const expenseRouter = require("./rest_controller/ExpenseController");
const creditRouter = require("./rest_controller/CreditController");
const personRouter = require("./rest_controller/PersonController");
const lendRouter = require("./rest_controller/LendController");
const cashRouter = require("./rest_controller/CashController");
const selfTransaction = require("./rest_controller/SelfTransferController.js");
const passport = require("./services/PassportService");

require("dotenv").config();

const applicationEnv = process.env.APP_ENV;

const oneDay = 1000 * 60 * 60 * 24;

function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
}

function isLoggedIn(req, res, next) {
  if (applicationEnv == "PROD") {
    req.user ? next() : res.render("not-authorized");
  }
  next();
}

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// ------ Set Session ---------------------


if (applicationEnv == "PROD") {

  app.use(
    expressSession({
      secret: `${randomValueHex(6)}-${randomValueHex(6)}-${randomValueHex(6)}`,
      saveUninitialized: true,
      cookie: { maxAge: oneDay },
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/failure",
    })
  );


  app.get("/auth/failure", (req, res) => {
    res.send("ERROR");
  });
} else if (applicationEnv == "DEV") {
  // This is for testing env

  app.use(
    expressSession({
      secret: "cats",
      saveUninitialized: false, // don't create session until something is stored
      resave: false, //don't save session if unmodified
      cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000, // In milliseconds. 5 Days in total.
        httpOnly: true,
      },
    }),
    (req, res, next) => {
      // Initialise default variables on the session object
      if (typeof req.session.initialisedSession === "undefined") {
        (req.session.initialisedSession = true),
          (req.session.passport = {user: {
            ID: "1234567890",
            firstName: "Sagnik",
            lastName: "Sarkar",
            Email: "sagniksarkar@ymail.com",
          }});
      }
      next();
    }
  );
}

app.use(function (req, res, next) {
  res.locals.session = req.session.passport;
  next();
});

// cookie parser middleware
app.use(cookieParser());

if (applicationEnv == "PROD") {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
} else if (applicationEnv == "DEV") {
  app.get("/auth/google", (req, res) => {
    res.redirect("/dashboard");
  });
}
// ------ All Routes for pages -------------
app.use("/transaction", isLoggedIn, transactionRoutes);
app.use("/settings", isLoggedIn, settingsRouter);
app.use("/login", loginRouter);
app.use("/dashboard", isLoggedIn, dashboardRouter);

// ------------- Rest Routes -----------------
app.use("/v1/lend", isLoggedIn, lendRouter);
app.use("/v1/persons", isLoggedIn, personRouter);
app.use("/v1/bank", isLoggedIn, bankRouter);
app.use("/v1/cash", isLoggedIn, cashRouter);
app.use("/v1/expense", isLoggedIn, expenseRouter);
app.use("/v1/credit", isLoggedIn, creditRouter);
app.use("/v1/self-transation", isLoggedIn, selfTransaction);
// Without middleware
app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/logout", function (req, res, next) {
  if (applicationEnv == "PROD") {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Alpha app listening on port 3000!");
});
