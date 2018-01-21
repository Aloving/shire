const unprotectedUrls = require('./unprotected-urls');

module.exports = {
	port: 3030,
	session: {
		secretkey: 'super-secret-key'
	},
	jwt: {
		secretkey: 'mamadavay',
		unprotectedUrls
	},
	mongoose: {
		uri: 'mongodb://localhost/shire',
		options: {
			promiseLibrary: global.Promise
		}
	}
}
