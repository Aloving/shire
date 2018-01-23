const Router = require('koa-router');
const userRoutes = require('./user');

const router = new Router();

// render index page
router.get('/', async (ctx) => {
  await ctx.render('index');
});

router.use(userRoutes.routes(), userRoutes.allowedMethods());

module.exports = router;
