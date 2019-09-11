const jwt = require('jsonwebtoken');

const User = require('../model/users');
const config = require('../config');

// add user
exports.addUser = async user => {
  const oldUser = await User.findOne({ email: user.email });
  if (oldUser) return false;
  const newUser = new User(user);
  return newUser.save();
};

// check if user email and password matches a valida user
exports.checkUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return false;
  const match = await user.comparePassword(password);
  if (!match) return false;

  return user;
};

//check if a user exists and deletes the user
exports.deleteUser = userId => {
  return User.findOneAndDelete({ _id: userId });
};

//generates jwt
exports.generateJWT = user => {
  const token = jwt.sign(user, config.JWT_KEY, { expiresIn: '5h' });
  return token;
};
