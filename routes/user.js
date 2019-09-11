const router = require('express').Router();
const userController = require('../controllers/users');
const {
  validateSignupBody,
  validateLoginBody
} = require('../middleware/validation');

const { authenticate, authorize } = require('../middleware/auth');

router.post('/signup', validateSignupBody, userController.signup);

router.post('/login', validateLoginBody, userController.login);

//delete a user
router.delete('/:id', [authenticate, authorize], userController.deleteUser);

module.exports = router;
