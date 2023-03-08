var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const dashboardRoute = require("./view_controller/Dashboard")

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use("/",dashboardRoute);

// Without middleware
app.get('/', function(req, res){
  res.redirect('/dashboard');
});

app.listen(3000, function () {
  console.log('Alpha app listening on port 3000!');
});