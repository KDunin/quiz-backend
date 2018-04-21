var mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);


module.exports.User = require("./user");
module.exports.Question = require("./question");
