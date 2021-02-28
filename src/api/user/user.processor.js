import User from './user.model';
import AppProcessor from '../_core/app.processor';
import _ from 'lodash';

/**
 * The ModuleProcessor class
 */
class UserProcessor extends AppProcessor {
	/**
	 * @param {String} authId The payload object
	 * @param {Object} obj The payload object
	 * @param {Object} session The payload object
	 * @return {Object}
	 */
	static async getUser(authId, obj, session = null) {
		return User.findOneAndUpdate({_id: authId},
			{
				$setOnInsert: {
					_id: authId,
					email: obj.email
				},
				...(_.pick(obj, ['firstName', 'lastName', 'avatar']))
			}, {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true,
				session
			});
	}
}

export default UserProcessor;
