const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    msg: err.message || 'Error',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === 'ValidationError') {
    defaultError.msg = 'Please provide a valid email address';
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    defaultError.msg = 'This email is already exists';
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

module.exports = errorHandlerMiddleware;
