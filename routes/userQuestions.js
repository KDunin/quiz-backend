const express = require('express');
const router = express.Router({ mergeParams: true });
const { createUserQuestion, getUserQuestions, editUserQuestion, deleteUserQuestion } = require("../handlers/userQuestions");

// prefix - /api/users/:id/
router.post('/', createUserQuestion);
router.get('/', getUserQuestions);
router.patch('/questions/:question_id', editUserQuestion);
router.delete('/questions/:question_id', deleteUserQuestion);

module.exports = router;
