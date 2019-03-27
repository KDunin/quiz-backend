const db = require('../models');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '188053040388-8g2mttb5udorqlnp6vnkglpjnud2psmj.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

exports.google = async function(req, res, next) {
  try {
    let user = await db.User.findOne({ username: req.body.email })
    const googleToken = await verify(req.body.token);
  
    if (!user) {
      user = await db.User.create({
        username: req.body.email,
        password: ''
      });

      user = await db.User.updateOne({ username: req.body.email }, {
        social: social.concat(googleToken)
      })
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
      audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload['sub'];
}
