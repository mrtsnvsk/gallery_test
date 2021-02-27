const { Schema, model } = require('mongoose');

const schema = new Schema({
  imageId: {
    type: Schema.Types.ObjectId,
  },
  login: {
    type: String,
  },
  comment: {
    type: String,
  },
});

module.exports = model('Comment', schema);
