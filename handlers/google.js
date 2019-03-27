const db = require('../models');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.google = async function(req, res, next) {
  try {
    const googleToken = await verify(req.body.token);
    const user = await db.User.findOne({ socials: googleToken })

    if (!user) {
      user = await db.User.create({
        username: req.body.email,
        password: process.env.DEFAULT_PASS,
        socials: [googleToken]
      });
    }

    const { _id, username, type, questions } = user;

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

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload['sub'];
}
