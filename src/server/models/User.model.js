const mongoose = require('../utils/mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const schema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

schema.methods.setPassword = function setPassword(pass) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').toString('hex');
};

schema.methods.validPassword = function validPassword(pass) {
  const hash = crypto.crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model('User', schema);
