const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/users');
const { urlPattern } = require('../utils/constants');

const router = express.Router();

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required().length(4),
    description: Joi.string().required().min(20).max(1000),
    image: Joi.string().required().pattern(urlPattern),
    trailer: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().min(2).max(255),
    nameEN: Joi.string().required().min(2).max(255),
  }),
}), createMovie);

router.delete('/_id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
