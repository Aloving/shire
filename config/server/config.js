const unprotectedUrls = require('./unprotected-urls');

module.exports = {
	port: 3030,
	secretkey: 'mamadavay',
	mongoose: {
		uri: 'mongodb://localhost/shire',
		options: {
			promiseLibrary: global.Promise
		}
	},
	unprotectedUrls
}
