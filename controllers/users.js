const userServices = require('../services/users');

/**
 * Creates a new user with a valid payload or body
 * @param {Object} req - client Request
 * @param {*} res - server Response
 * @param {*} next
 */
async function signup(req, res, next) {
  try {
    const user = await userServices.addUser(req.body);
    if (!user) {
      return res.status(409).send({
        message: 'Email already in use',
        data: null,
        error: null
      });
    }
    res.status(200).send({
      message: 'User created',
      data: null,
      error: null
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
    const user = await userServices.checkUser(req.body);
    if (!user) {
      return res.status(401).send({
        message: 'Auth Failed. Email or password is Incorrect',
        data: null,
        error: null
      });
    }
    const token = userServices.generateJWT({
      email: user.email,
      role: user.role
    });

    res.status(200).send({
      message: 'User Login was successful',
      data: {
        email: user.email,
        username: user.username,
        token
      },
      error: null
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await userServices.deleteUser(req.params.id);
    res.status(200).send({
      message: 'User was deleted',
      data: null,
      error: null
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).send({
      message: 'All users',
      data: {
        users
      },
      error: null
    });
  } catch (error) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  deleteUser,
  getAllUsers
};
