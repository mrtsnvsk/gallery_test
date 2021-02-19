const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

const PORT = config.get('port') || 8080;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.use(express.json());

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, cache-control, pragma, Authorization'
      );

      next();
    });

    app.use('/api', require('./routes/UserRoute'));
    app.use('/api', require('./routes/ImageRoute'));
    app.use('/api', require('./routes/CommentRoute'));
    app.use('/static', express.static('img'));

    app.listen(PORT, () => console.log(`App has been started on ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
};

start();
