const mongoose = require('mongoose');
const { urlPattern, movieYear } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return movieYear.test(v);
      },
      message: () => 'Год выпуска фильма должен состоять из четырех цифр',
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: (props) => `Ссылка ${props.value} не соответствует формату URL!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: (props) => `Ссылка ${props.value} не соответствует формату URL!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: (props) => `Ссылка ${props.value} не соответствует формату URL!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        return Number.isInteger(v);
      },
      message: () => 'ID фильма со стороннего ресурса должен быть целым числом!',
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
