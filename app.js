const express = require('express');
const logger = require('morgan');
const Router = express.Router();

const appRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

app.use('/api', appRoutes(Router));

app.use((req, res, next) => {
  const error = new Error('Not Found');
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    status: 'Internal Server Error',
    error: err
  });
});

module.exports = app;
