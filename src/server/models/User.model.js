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

schema.methods.hashPassword = function hashPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return hash;
};

schema.methods.setSalt = function setSalt() {
  this.salt = crypto.randomBytes(16).toString('hex');
};

schema.methods.setPassword = function setPassword(password) {
  this.setSalt();
  this.hash = this.hashPassword(password);
};

schema.methods.validPassword = function validPassword(password) {
  const hash = this.hashPassword(password);
  return this.hash === hash;
};

schema.methods.generateToken = function generateToken() {
  return auth.generateToken({
    username: this.username,
  });
};

module.exports = mongoose.model('User', schema);
