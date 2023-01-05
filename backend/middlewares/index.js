const errorHandlerMiddleware = require('./errorHandler');
const notFoundMiddleware = require('./notFound');
const { authMiddleware, authOwner, authAdmin } = require('./auth');

module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authMiddleware,
  authOwner,
  authAdmin,
};
