var db = require('../models');

exports.getQuestions = function(req, res){
  db.Question.find()
    .then(function(questions){
      res.json(questions);
    })
    .catch(function(err){
      res.send(err);
  })
}

exports.createQuestion = function(req, res){
  db.Question.create(req.body)
    .then(function(newQuestion){
      res.status(201).json(newQuestion)
    })
  .catch(function(err){
    re.send(err)
  })
}

module.exports = exports;