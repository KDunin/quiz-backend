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
  console.log(req.body)
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
  const question = await db.Question.findById(req.params.question_id)
  if (!question) {
    return next({ status: 422, message: "Question not found!" });
  }
  if (req.params.id != question.user) {
    return next({ status: 401, message: 'You can modify only own questions' })
  }
  try {
    const modyfiedQuestion = await db.Question.findByIdAndUpdate(req.params.question_id, req.body, { new: true })
    console.log(modyfiedQuestion)
    if (modyfiedQuestion) {
      return res.json(modyfiedQuestion)
    }
  } catch(error) {
    return next({ status: 400, message: "Editing question failed." });
  }
}

// DELETE - /api/user/:id/questions/:question_id
exports.deleteUserQuestion = async function(req, res, next) {
  const question = await db.Question.findById(req.params.question_id)
  if (!question) {
    return next({ status: 422, message: "Question not found!" });
  }
  if (req.params.id != question.user) {
    return next({ status: 401, message: 'You can delete only own questions' })
  }
  try {
    const deletedQuestion = await db.Question.remove({ _id: req.params.question_id })
    if (deletedQuestion) {
      return res.json('Question successfully deleted!')
    }
  } catch(error) {
    return  next({ status: 400, message:  "Deleting question failed." });
  }
}
