const express = require('express');
const router = express.Router();

const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateUser,
} = require('../controllers/user');
const { emailPattern } = require('../utils/constants');
const uriSegment = '/users';

router.get(`${uriSegment}/me`, getUser);

router.patch(`${uriSegment}/me`, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailPattern),
  }),
}), updateUser);

module.exports = router;
