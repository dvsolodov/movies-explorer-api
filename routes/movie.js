const express = require('express');
const router = express.Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const {
  createMovieValidator,
  deleteMovieValidator
} = require('../middlewares/validators');

const uriSegment = '/movies';

router.get(`${uriSegment}/`, getMovies);

router.post(`${uriSegment}/`, createMovieValidator, createMovie);

router.delete(`${uriSegment}/:movieId`, deleteMovieValidator, deleteMovie);

module.exports = router;
