const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");
var session = require('express-session');
const routes = require("./routes");
// require("dotenv").config();



// const applicationEnv = process.env.APP_ENV;

// const oneDay = 1000 * 60 * 60 * 24;

let app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.set("views", path.join(__dirname, "views"));
app.use("/apps/behisebe", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

app.use("/apps/behisebe",routes);

app.listen(3000, function () {
    console.log("Alpha app listening on port 3000!");
});
