const mongoose = require('mongoose');
const config = require('../../../config/server');

mongoose.connect(
  config.get('mongoose.uri'),
  config.get('mongoose.options'),
);

module.exports = mongoose;
