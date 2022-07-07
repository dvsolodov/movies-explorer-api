const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');

const auth = require('../middlewares/auth');
const { loginValidator, registerValidator } = require('../middlewares/validators');

const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_ERR_MSG } = require('../utils/constants');

router.post('/signin', loginValidator, login);
router.post('/signup', registerValidator, createUser);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('/', () => {
  throw new NotFoundError(NOT_FOUND_ERR_MSG);
});

module.exports = router;
