const mongoose = require('../utils/mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  operationType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const myModel = mongoose.model('Operation', schema);

// function create() {
//   myModel.create
// }

module.exports = mongoose.model('Operation', schema);
