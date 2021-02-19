const { Schema, model } = require('mongoose');

const schema = new Schema({
  login: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = model('Image', schema);
