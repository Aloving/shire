const Koa = require('koa');

const app = new Koa();

const { passport } = require('./utils');
const router = require('./routes');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const debug = require('debug');
const path = require('path');
const jwt = require('koa-jwt');
const config = require('../../config/server');

const port = process.env.PORT || config.get('port');
const root = `${__dirname}/../../`;

// debug
debug('koa2:server');

// error handler
onerror(app, {
  json(err, ctx) {
    ctx.body = {
      success: false,
      err,
    };
  },
});

// middlewares
app
  .use(json())
  .use(koaBody())
  .use(logger())
  .use(koaStatic(`${root}/static`))
  .use(views(`${root}/views`, {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { pug: 'pug' },
    extension: 'pug',
  }))
  .use(jwt({ secret: config.get('jwt.secretkey') }).unless({
    path: config.get('jwt.unprotectedUrls'),
  }))
  .use(passport.initialize())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  process.stdout.write(`Listening on http://localhost:${port}\n`);
});
