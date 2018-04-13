var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res) {
  db.Question.find()
    .then(function(questions){
      res.json(questions);
    })
    .catch(function(err){
      res.send(err);
  })
});

router.post('/', function(req, res){
  db.Question.create(req.body)
    .then(function(newQuestion){
      res.status(201).json(newQuestion)
    })
  .catch(function(err){
    res.send(err)
  })
});

router.delete('/:questionId', function(req, res){
  db.Question.remove({ _id: req.params.questionId })
    .then(function(deltedQuestion){
      res.json(deltedQuestion)
    })
  .catch(function(err){
    res.send(err)
  })
});

module.exports = router;