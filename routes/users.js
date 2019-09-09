const router = require('express').Router();
const userController = require('../controllers/users');
const {
  validateSignupBody,
  validateLoginBody
} = require('../middleware/validation');

router.post('/signup', validateSignupBody, userController.signup);

router.post('/login', validateLoginBody, userController.login);

module.exports = router;
