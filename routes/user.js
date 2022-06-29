const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getUserById,
  updateUser,
} = require('../controllers/users');
const { emailPattern } = require('../utils/constants');

const router = express.Router();

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailPattern),
  }),
}), updateUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

module.exports = router;
