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

router.patch('/:id', function(req, res){
  db.Question.findByIdAndUpdate( req.params.id, req.body, { new: true })
    .then(function(question){
      res.json(question)
    })
  .catch(function(err){
    res.send(err)
  }) 
});

router.delete('/:id', function(req, res){
  db.Question.remove({ _id: req.params.id })
    .then(function(question){
      res.json(question)
    })
  .catch(function(err){
    res.send(err)
  })
});

module.exports = router;
