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

/**
 * Method for hash password
 * @param  {String} password Initial password
 * @return {String}
 */
schema.methods.hashPassword = function hashPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha256').toString('hex');
  return hash;
};

/**
 * Method sets salt in to model
 */
schema.methods.setSalt = function setSalt() {
  this.salt = crypto.randomBytes(16).toString('hex');
};

/**
 * Method for set password to the model
 * @param {String} password Incoming password
 */
schema.methods.setPassword = function setPassword(password) {
  this.setSalt();
  this.hash = this.hashPassword(password);
};

/**
 * Method checks password for valid
 * @param  {String} password Incoming password
 * @return {Boolean}
 */
schema.methods.validPassword = function validPassword(password) {
  const hash = this.hashPassword(password);
  return this.hash === hash;
};

/**
 * Method generates token by user model
 * @return {String} Token
 */
schema.methods.generateToken = function generateToken() {
  return auth.generateToken({
    username: this.username,
  });
};

module.exports = mongoose.model('User', schema);
