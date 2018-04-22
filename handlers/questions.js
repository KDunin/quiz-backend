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
      return res.json('Question successfully modify!')
    }
    else {
      return next({ status: 400, message: "Question not found!" });
    }
  } catch(error) {
    return next({ status: 400, message: "Editing question failed." });
  }
}

exports.deleteQuestion = async function(req, res, next){
  try {
    const question = await db.Question.remove({ _id: req.params.id })
    if (question.n) {
      return res.json('Question successfully deleted!')
    }
    else {
      return next({ status: 400, message: "Question not found!" });
    }
  } catch(error) {
    return  next({ status: 400, message:  "Deleting question failed." });
  }
}
