require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error')
const { loginRequired, ensureCorrectUser }  = require('./middleware/auth')

const port = process.env.PORT || 8080

const questionRoutes = require('./routes/questions')
const authRoutes = require('./routes/auth')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('Is this thing on?');
});

app.use('/api/auth', authRoutes)
app.use('/api/questions',
  questionRoutes
)


app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err)
})

app.use(errorHandler)

app.listen(port, function(){
  console.log(`APP RUNNING ON PORT ${port}`);
});
