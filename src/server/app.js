const Koa = require('koa');

const app = new Koa();

const router = require('./routes');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
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
onerror(app);

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(koaStatic(`${root}/static`))
  .use(views(`${root}/views`, {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { pug: 'pug' },
    extension: 'pug',
  }))
  .use(jwt({ secret: config.get('secretkey') }).unless({
    path: config.get('unprotectedUrls'),
  }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  process.stdout.write(`Listening on http://localhost:${port}\n`);
});
