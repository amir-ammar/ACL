const { StatusCodes } = require('http-status-codes');

class NotFoundErrorApi extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundErrorApi;
