const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/constants');

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required().integer(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlPattern),
    trailerLink: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required().min(2).max(255),
    nameEN: Joi.string().required().min(2).max(255),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
module.exports = {
  loginValidator,
  registerValidator,
  userUpdateValidator,
  createMovieValidator,
  deleteMovieValidator,
};
