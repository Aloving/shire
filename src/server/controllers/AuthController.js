const jwt = require('jsonwebtoken');
const config = require('../../../config/server');

const auth = {
  generateToken(payload) {
    return jwt.sign(payload, config.get('jwt.secretkey'));
  },
};

module.exports = auth;
