const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { urlPattern } = require('../utils/constants');

const router = express.Router();

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.number().required().integer(),
    description: Joi.string().required().min(20).max(1000),
    image: Joi.string().required().pattern(urlPattern),
    trailerLink: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    owner: Joi.string().length(24).hex().optional()
      .allow(''),
    movieId: Joi.string(),
    nameRU: Joi.string().required().min(2).max(255),
    nameEN: Joi.string().required().min(2).max(255),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
