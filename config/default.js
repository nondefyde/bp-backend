require('dotenv').config();
const PORT = process.env.PORT || 3000;
module.exports = {
	app: {
		appName: process.env.APP_NAME || 'App Name',
		environment: process.env.NODE_ENV || 'dev',
		superSecret: process.env.SERVER_SECRET || 'ipa-BUhBOJAm',
		baseUrl: `http://localhost:${PORT}`,
		port: PORT
	},
	api: {
		lang: 'en',
		prefix: '^/v[1-9]',
		versions: [1],
		pagination: {
			itemsPerPage: 10
		},
		expiresIn: 3600 * 124 * 100,
	},
	databases: {
		mongodb: {
			url: process.env.DB_URL,
			test: process.env.DB_TEST_URL
		}
	},
	excludedUrls: [
		{ route: '', method: 'GET' },
		{ route: 'login', method: 'POST' }
	],
};
