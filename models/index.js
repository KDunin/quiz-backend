var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quiz-api');

mongoose.Promise = Promise;

module.exports.Question = require("./question");