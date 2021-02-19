const { Schema, model } = require('mongoose');

const schema = new Schema({
  login: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = model('User', schema);
