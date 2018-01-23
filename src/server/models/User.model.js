const mongoose = require('../utils/mongoose');
const crypto = require('crypto');
const auth = require('../controllers/controller-module/Auth');

const { Schema } = mongoose;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
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

schema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha256').toString('hex');
};

schema.methods.validPassword = function validPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha256').toString('hex');
  return this.hash === hash;
};

schema.methods.generateToken = function generateToken() {
  return auth.generateToken({
    username: this.username,
  });
};

module.exports = mongoose.model('User', schema);
