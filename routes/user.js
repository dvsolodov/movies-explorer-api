const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
} = require('../controllers/user');
const { userUpdateValidator } = require('../middlewares/validators');

const uriSegment = '/users';

router.get(`${uriSegment}/me`, getUser);

router.patch(`${uriSegment}/me`, userUpdateValidator, updateUser);

module.exports = router;
