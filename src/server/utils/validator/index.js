const Ajv = require('ajv');
const scheme = require('./scheme');

const ajv = new Ajv();

ajv.addSchema(scheme);
