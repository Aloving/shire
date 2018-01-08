const validator = require('./validator');
const mongoose = require('./mongoose');

exports.mongoose = mongoose;
exports.validator = validator;
module.exports = {
  validator,
  mongoose,
};
