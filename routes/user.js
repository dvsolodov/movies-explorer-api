const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getUserById,
  updateUser,
} = require('../controllers/user');
const { emailPattern } = require('../utils/constants');

const router = express.Router();

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailPattern),
  }),
}), updateUser);

module.exports = router;
