const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const secretRoutes = require('./routes/secret');

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
  })
);

app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use(secretRoutes);

// connect to mongoDB with mongoose
const connectionString = "USE_YOUR_MONGODB_KEY";
mongoose
  .connect(connectionString)
  .then(result => {
  })
  .catch(err => console.log(err));



  module.exports = app;