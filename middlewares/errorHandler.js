const { INTERNAL_SERVER_ERR_MSG } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? INTERNAL_SERVER_ERR_MSG(err.name, err,message)
        : message,
    });

  return next();
};
