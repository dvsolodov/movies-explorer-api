const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');

const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/user');
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../errors/not-found-err');
const { urlPattern } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
  }),
}), createUser);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('/', () => {
  throw new NotFoundError('Нет данных');
});

module.exports = router;
