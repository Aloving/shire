const UserModule = require('../controller-module/User');
const AuthModule = require('../controller-module/Auth');

const routeController = {
  async token(ctx) {
    const payload = ctx.request.body;
    ctx.body = AuthModule.generateToken(payload);
  },

  async login(ctx, next) {
    const { username } = ctx.state.user;
    try {
      const user = await UserModule.findByUserName(username);
      ctx.body = user.generateToken();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = routeController;
