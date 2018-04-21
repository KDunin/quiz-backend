const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.body.username
    })
    const { _id, username, type, questions } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign({
        id: _id,
        username,
        type
      }, process.env.SECRET_KEY)
      return res.status(200).json({
        id: _id,
        username,
        questions,
        token,
        type
      })
    } else {
      return next({
        status: 400,
        message: "Invalid Username/Password"
      })
    } 
  } catch (error) {
    return next({
      status: 400,
      message: "Invalid Username/Password"
    })
  }
}


exports.signup = async function(req, res, next) {
  try {
    if(req.body.type !== undefined) {
      return next({
        status: 400,
        message: "Invalid type."
      });
    }
    let user = await db.User.create(req.body);
    const { _id, username, type } = user
    const token = jwt.sign({
      id: _id,
      username,
      type,
    }, process.env.SECRET_KEY)
    return res.status(200).json({
      id: _id,
      username,
      token,
      type
    })
  } catch (error) {
    if(error.code === 11000) {
      error.message = "This username is taken"
    }
    return next({
      status: 400,
      message: error.message
    })
  }
}
