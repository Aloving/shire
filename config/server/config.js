const unprotectedUrls = require('./unprotected-urls');

module.exports = {
	port: 3030,
	secretkey: 'mamadavay',
	mongoose: {
		uri: 'mongodb://localhost/kekapp',
		options: {
			promiseLibrary: global.Promise
		}
	},
	unprotectedUrls
}
