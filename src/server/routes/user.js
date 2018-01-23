const Router = require('koa-router');
const user = require('../controllers/controller-route/User');
const { passport } = require('../utils');

const router = new Router();

router.post('/token', user.token);

router.post('/login', passport.authenticate('jwt', { session: false }), user.login);

module.exports = router;
