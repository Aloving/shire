const mongoose = require('../utils/mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  operationType: {
    type: String,
    enum: ['expense', 'income'],
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

module.exports = mongoose.model('Operation', schema);
