var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080

var questionRoutes = require('./routes/questions')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('Is this thing on?');
});

app.use('/api/questions', questionRoutes)

app.listen(port, function(){
  console.log(`APP RUNNING ON PORT ${port}`);
});
