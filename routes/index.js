const userRoute = require('./user');
const usersRoute = require('./users');

module.exports = function(router) {
  router.use('/user', userRoute);
  router.use('/users', usersRoute);
  return router;
};
