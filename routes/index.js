const userRoute = require('./users');

module.exports = function(router) {
  router.use('/user', userRoute);
  return router;
};
