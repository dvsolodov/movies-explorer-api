const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_.~#?&//=+]*/;
const passwordPattern = /^[a-zA-Z0-9]{8,}$/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const movieYear = /^\d{4}$/;

const allowedCors = [
  'https://solodov-dplm.students.nomoredomains.xyz/',
  'http://solodov-dplm.students.nomoredomains.xyz/',
  'http://localhost:3000',
  'http://localhost:3001',
];

const LOGIN_SUCCESSFUL_MSG = 'Успешный вход в систему';
const DELETE_MOVIE_MSG = 'Фильм удален';
const NOT_FOUND_ERR_MSG = 'Нет данных';
const NOT_FOUND_MOVIE_ERR_MSG = 'Фильм с таким ID не найден';
const UNAUTHORIZED_ERR_MSG = 'Необходима авторизация';
const DELETE_MOVIE_ERR_MSG = 'Нельзя удалять чужие фильмы';
const INCORRECT_DATA_ERR_MSG = 'Для создания фильма переданы некорректные данные';
const INCORRECT_REGISTER_DATA_ERR_MSG = 'Для регистрации переданы некорректные данные';
const USER_EXISTS_ERR_MSG = 'Пользователь с такой почтой уже зарегистрирован';
const INCORRECT_LOGIN_DATA_ERR_MSG = 'Неправильные почта или пароль';
const INTERNAL_SERVER_ERR_MSG = (errName, errMsg) => `На сервере произошла ошибка: ${errName} = ${errMsg}`;

module.exports = {
  urlPattern,
  passwordPattern,
  emailPattern,
  movieYear,
  allowedCors,
  LOGIN_SUCCESSFUL_MSG,
  DELETE_MOVIE_MSG,
  NOT_FOUND_ERR_MSG,
  UNAUTHORIZED_ERR_MSG,
  INTERNAL_SERVER_ERR_MSG,
  DELETE_MOVIE_ERR_MSG,
  NOT_FOUND_MOVIE_ERR_MSG,
  INCORRECT_DATA_ERR_MSG,
  INCORRECT_REGISTER_DATA_ERR_MSG,
  USER_EXISTS_ERR_MSG,
  INCORRECT_LOGIN_DATA_ERR_MSG,
};
