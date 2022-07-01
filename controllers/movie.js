const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Нет данных');
      }

      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    owner: req.user._id,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет данных');
      }

      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Для создания фильма переданы некорректные данные'));
      }

      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм с таким ID не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалять чужие фильмы'));
      }

      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
