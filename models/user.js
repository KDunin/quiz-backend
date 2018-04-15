const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  questions: {
    type: Array,
  },
  type: {
    type: String,
    default: "User",
  }
});

userSchema.pre('save', async function(next){
  try {
    if(!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next()
  } catch (error) {
    return next(error);
  }
})

userSchema.methods.comparePasssword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error)
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
