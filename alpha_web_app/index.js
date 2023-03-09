var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const staticRoutes = require("./view_controller/StaticRoutes.js");
const settingsRouter = require("./view_controller/SettingRoutes");
const bankRouter = require("./rest_controller/BankController");

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// ------ All Routes for pages -------------
app.use("/",staticRoutes);
app.use("/settings",settingsRouter)

// ------------- Rest Routes -----------------

app.use("/v1/bank",bankRouter);

// Without middleware
app.get('/', function(req, res){
  res.redirect('/dashboard');
});

app.listen(3000, function () {
  console.log('Alpha app listening on port 3000!');
});