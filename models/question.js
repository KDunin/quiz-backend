var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: 'Question cannot be blank!'
  },
  answers: {
    type: Array,
    required: 'Provide options!'    
  },
  correct: {
    type: String,
    required: 'Provide correct answer!'
  }
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
