const mongoose = require('mongoose');
const { emailPattern } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return emailPattern.test(v);
      },
      message: (props) => `${props.value} не соответствует формату адреса электронной почты!`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);