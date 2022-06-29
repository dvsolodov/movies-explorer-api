const mongoose = require('mongoose');
const { urlPattern } = require('../utils/constants');

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
    maxlength: 30,
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
        return (v.length === 4) && (typeof Number(v) === 'number');
      },
      message: () => 'Год выпуска фильма должен состоять из четырех цифр',
    },
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 100,
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
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
