var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

mongoose.Promise = Promise;

module.exports.Question = require("./question");
