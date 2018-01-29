const jwt = require('jsonwebtoken');
const config = require('../../../../config/server');

const auth = {
  /**
   * Method for generate token
   * @param  {any} payload Payload for token. Object as usual
   * @return {String}
   */
  generateToken(payload) {
    return jwt.sign(payload, config.get('jwt.secretkey'));
  },
};

module.exports = auth;
