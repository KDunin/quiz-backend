const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
  },
  password: {
    type: String,
    required: 'Password is required',    
  },
  type: {
    type: String,
    default: "User",
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  }],
  socials: [{
    type: String,
    unique: true
  }]
});

userSchema.pre("save", function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(this.password, salt, null, function(err, hash){
      return hash
    });
    this.password = hashedPassword
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = function(candidatePassword, next) {
  try {
    let isMatch = bcrypt.compareSync(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
