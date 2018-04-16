const express = require('express')
const router = express.Router()
const { getQuestions, createQuestion, editQuestion, deleteQuestion } = require("../handlers/questions")

router.get('/', getQuestions)
router.post('/', createQuestion)
router.patch('/:id', editQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router
