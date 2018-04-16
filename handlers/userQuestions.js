const db = require("../models");

// GET - /api/user/:id/
exports.getUserQuestions = async function(req, res, next) {
  try {
    const userQuestions = await db.Question.find({
      user: req.params.id,
    })
    const defaultQuestions = await db.Question.find({
      user: undefined,
    })
    const allQuestions = [...userQuestions, ...defaultQuestions]
    return res.status(200).json(allQuestions);
  } catch (err) {
    return next(err);
  }
};

// POST - /api/user/:id/
exports.createUserQuestion = async function(req, res, next){
  try {
    const question = await db.Question.create({
      question: req.body.question,
      answers: req.body.answers,
      correct: req.body.correct,
      user: req.params.id
    })
    const foundUser = await db.User.findById(req.params.id);
    foundUser.questions.push(question);
    await foundUser.save()
    return res.status(201).json(question)
  } catch(error) {
    return next(error)
  }
}

// PATCH - /api/user/:id/questions/:question_id
exports.editUserQuestion = async function(req, res, next) {
  try {
    const question = await db.Question.findByIdAndUpdate(req.params.question_id, req.body, { new: true })
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

// DELETE - /api/user/:id/questions/:question_id
exports.deleteUserQuestion = async function(req, res, next) {
  console.log(req.params)
  try {
    const question = await db.Question.remove({ _id: req.params.question_id })
    return next({ message: "Deleting question sucess." });
  } catch(error) {
    return next(error)
  }
}