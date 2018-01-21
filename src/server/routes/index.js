const Router = require('koa-router');
const auth = require('../controllers/Auth.controller');
const userController = require('../controllers/User.controller');
const { passport } = require('../utils');

const router = new Router();

// render index page
router.get('/', async (ctx) => {
  await ctx.render('index');
});

router.post('/token', async (ctx) => {
  const payload = ctx.request.body;
  ctx.body = auth.generateToken(payload);
});

router.post('/login', passport.authenticate('jwt', { session: false }), async (ctx, next) => {
  const { username } = ctx.state.user;
  try {
    const user = await userController.findByUserName(username);
    ctx.body = user.generateToken();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
