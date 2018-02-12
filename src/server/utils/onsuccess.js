function json(data, ctx) {
  ctx.body = {
    success: true,
    data,
  };
}

const defaultOptions = {
  json,
};

/* eslint no-param-reassign: ["error", { "props": false }] */
module.exports = (app, opt) => {
  const options = { ...opt, ...defaultOptions };
  app.context.onsuccess = function onsuccess(result) {
    options.json.call(this, result, this);
  };
};
