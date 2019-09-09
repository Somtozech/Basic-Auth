const { addUser, checkUser, generateJWT } = require('../services/users');

/**
 * Creates a new user with a valid payload or body
 * @param {Object} req - client Request
 * @param {*} res - server Response
 * @param {*} next
 */
async function signup(req, res, next) {
  try {
    const user = await addUser(req.body);
    if (!user) {
      return res.status(409).send({
        status: 'Conflict',
        message: 'Email already in use'
      });
    }
    res.status(200).send({
      message: 'User created'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Checks if a user is a valid user. Generates a token and sends as a response
 * @param {Object} req - client Request
 * @param {*} res - server Response
 * @param {*} next
 */
async function login(req, res, next) {
  try {
    const user = await checkUser(req.body);
    if (!user) {
      return res.status(401).send({
        message: 'Auth Failed. Email or password is Incorrect'
      });
    }
    const token = generateJWT({
      email: user.email
    });

    res.status(200).send({
      message: 'User Login was successful',
      email: user.email,
      username: user.username,
      token
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login
};
