const { Schema, model } = require('mongoose');

const schema = new Schema({
  imageId: {
    type: String,
  },
  login: {
    type: String,
  },
  comment: {
    type: String,
  },
});

module.exports = model('Comment', schema);
