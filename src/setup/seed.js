import Auth from '../api/auth/auth.model';
import User from '../api/user/user.model';
import bcrypt from 'bcrypt-nodejs';
import _ from 'lodash';

export default () => {
	const seedData = [
		{
			_id: '3cfbfd84-cdc4-41bb-b92c-ccd0687d0338',
			firstName: 'Fulano',
			lastName: 'Admin',
			role: 'admin',
			username: 'admin',
			password: 'one.admin.two.three'
		},
		{
			_id: '0b6a3eaf-58de-43b1-9a5a-c0be8745e167',
			firstName: 'Mengano',
			lastName: 'User',
			role: 'user',
			username: 'user',
			password: 'one.user.two.three'
		}
	];

	const createdUsers = [];
	seedData.forEach(async (data, index) => {
		let auth = await Auth.findOneAndUpdate({
			publicId: data._id,
			username: data.username
		}, {
			username: data.username,
			password: bcrypt.hashSync(data.password),
			$setOnInsert: {
				publicId: data._id
			}
		}, {upsert: true, new: true, setDefaultsOnInsert: true});


		let user = await User.findOneAndUpdate({
			_id: auth._id,
			username: data.username
		}, {
			..._.omit(data, ['_id', 'password']),
			auth: auth._id
		}, {upsert: true, new: true, setDefaultsOnInsert: true, _id: false});
		createdUsers.push({auth, user});
	});

	return Promise.resolve(createdUsers);
};
