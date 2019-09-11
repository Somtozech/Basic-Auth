const router = require('express').Router();
const userController = require('../controllers/users');

const { authenticate, authorize } = require('../middleware/auth');

router.get('/', [authenticate, authorize], userController.getAllUsers);

module.exports = router;
