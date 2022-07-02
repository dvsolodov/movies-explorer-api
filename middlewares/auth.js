const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { NOT_FOUND_ERR_MSG } = require('../utils/constants');

const { UNAUTHORIZED_ERR_MSG } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED_ERR_MSG);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_ERR_MSG);
  }

  req.user = payload;

  return next();
};
