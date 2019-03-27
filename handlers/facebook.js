const db = require('../models');
const jwt = require('jsonwebtoken');

exports.facebook = async function(req, res, next) {
  try {
    const id = req.body.id;
    const email = req.body.email.trim();

    let user = await db.User.findOne({ $or: [
      {socials: id},
      {username: email}
    ]})

    if (!user) {
      user = await db.User.create({
        username: email,
        password: process.env.DEFAULT_PASS,
        socials: [id]
      });
    }

    if(!user.socials.includes(id)) {
      user = await db.User.findByIdAndUpdate(user._id, socials.concat(id))
    }

    const { _id, username, type, questions, socials } = user;

    const token = jwt.sign({
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
  } catch {
    return next({
      status: 400,
      message: "Something went wrong. Sorry :("
    })
  }
}
