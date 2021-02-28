import mongoose from 'mongoose';

export default config => {
	mongoose.Promise = Promise;
	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose connection to mongodb shell disconnected');
	});
	// Connect to MongoDb
	const databaseUrl = process.env.DB_TEST_URL;
	return mongoose
		.connect(databaseUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
};
