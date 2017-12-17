const _  = require('lodash');
const config = require('./config');

exports.get = (path) => _.get(config, path);
