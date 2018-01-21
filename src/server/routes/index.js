const Router = require('koa-router');
const auth = require('../controllers/AuthController');
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

router.post('/login', passport.authenticate('jwt', { session: false }), async (ctx) => {
  ctx.body = ctx.state.user;
});

module.exports = router;
