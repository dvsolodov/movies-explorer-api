const passwordPattern = /^[a-zA-Z0-9]{8,}$/;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*
const allowedCors = [
  'http://solodov.students.nomoredomains.xyz',
  'https://solodov.students.nomoredomains.xyz',
  'http://localhost:3000',
];
*/

module.exports = {
  passwordPattern,
  emailPattern,
  allowedCors,
};