require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');
const errorHandler = require('./middlewares/errorHandler');


const { PORT = 3000 } = process.env;


mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(corsHandler);

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
