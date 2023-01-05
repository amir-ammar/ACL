const { UnauthorizedError } = require('../Errors');
const { verifyToken } = require('../utils');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthorizedError('Authentication failed');
  } else {
    const token = authHeader.split(' ')[1];
    console.log('token', token);
    try {
      const payload = verifyToken(token);
      req.user = { userId: payload.userId, type: payload.type };
      console.log('authHeader', req.user);
      next();
    } catch (error) {
      console.log(error);
      throw new UnauthorizedError('Authentication failed');
    }
  }
};

const authOwner = (req, res, next) => {
  //TODO check signed in user authorization
  console.log('check if same user');
  next();
};

const authAdmin = (req, res, next) => {
  //TODO check singed in user is admin
  if (req.user.type !== 'Admin') {
    res.status(401).send({ msg: 'you are not authorized' });
  }
  next();
};

module.exports = {
  authMiddleware,
  authOwner,
  authAdmin,
};
