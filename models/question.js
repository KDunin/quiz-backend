const mongoose = require('mongoose');
const User = require('./user')

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
  },
  category: {
    type: String,
    required: 'Provide question category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

questionSchema.pre("remove", async function(next) {
  try {
    let user = await User.findById(this.user);
    user.questions.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
