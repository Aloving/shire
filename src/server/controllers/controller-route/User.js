const _ = require('lodash');
const UserModule = require('../controller-module/User');
const AuthModule = require('../controller-module/Auth');

const routeController = {
  async token(ctx) {
    const payload = _.get(ctx, 'request.body');
    ctx.body = AuthModule.generateToken(payload);
  },

  async login(ctx) {
    const { username } = _.get(ctx, 'state.user');
    try {
      const user = await UserModule.findByUserName(username);
      ctx.body = user.generateToken();
    } catch (err) {
      ctx.onerror(err.toJSON());
    }
  },

  async register(ctx) {
    try {
      const body = JSON.parse(_.get(ctx, 'request.body'));
      const response = await UserModule.createNewUser(body);
      ctx.body = response;
    } catch (err) {
      // ctx.onerror(err.toJSON());
      ctx.onerror(err);
    }
  },
};

module.exports = routeController;
