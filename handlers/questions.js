const db = require('../models');

exports.getQuestions = async function(req, res, next){
  try {
    const questions = await db.Question.find({
      user: undefined,
    })
    if (questions) {
      return res.status(200).json(questions)
    }
    else {
      return next({ status: 400, message: "Cannot get questions list." });
    }
  } catch(error) {
    return next({ status: 400, message: "Cannot get questions list." });
  }
}

exports.createQuestion = async function(req, res, next){
  try {
    const question = await db.Question.create(req.body)
    if (question) {
      return res.status(201).json(question)  
    }
    else {
      return next({ status: 400, message: "Creating question failed." });
    }
  } catch(error) {
    return next(error)
  }
}

exports.editQuestion = async function(req, res, next){
  try {
    const question = await db.Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (question) {
      return res.json(question)  
    }
    else {
      return next({ status: 400, message: "Editing question failed." });
    }
  } catch(error) {
    return next(error)
  }
}

exports.deleteQuestion = async function(req, res, next){
  try {
    const question = await db.Question.remove({ _id: req.params.id })
    if (question) {
      return res.json(req)
    }
    else {
      return next({ status: 400, message: "Deleting question failed." });
    }
  } catch(error) {
    return next(error)
  }
}
