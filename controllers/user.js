const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const {
  NOT_FOUND_ERR_MSG,
  INCORRECT_REGISTER_DATA_ERR_MSG,
  INCORRECT_LOGIN_DATA_ERR_MSG,
  USER_EXISTS_ERR_MSG,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERR_MSG);
      }

      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create(
        {
          name, email, password: hash,
        },
      )
        .then((user) => {
          if (!user) {
            throw new NotFoundError(NOT_FOUND_ERR_MSG);
          }

          const responseUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
          };

          res.send(responseUser)
            .end();
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError(USER_EXISTS_ERR_MSG));
          }

          if (err.name === 'ValidationError') {
            return next(new BadRequestError(INCORRECT_REGISTER_DATA_ERR_MSG));
          }

          return next(err);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERR_MSG);
      }

      res.send(user)
        .end();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_REGISTER_DATA_ERR_MSG));
      }

      return next(err);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INCORRECT_LOGIN_DATA_ERR_MSG);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log(matched);
            throw new UnauthorizedError(INCORRECT_LOGIN_DATA_ERR_MSG);
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: 3600 },
          );

          res.send({
            message: 'Успешный вход в систему',
            token,
          })
            .end();
        });
    })
    .catch(next);
};

module.exports = {
  login,
  getUser,
  createUser,
  updateUser,
};
