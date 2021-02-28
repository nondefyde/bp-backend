import jwt from 'jsonwebtoken';
import lang from '../../lang';
import config from 'config';
import _ from 'lodash';
import AppError from '../../lib/app-error';
import {NOT_FOUND, UNAUTHORIZED} from '../../utils/constants';
import AppResponse from '../../lib/app-response';

const AuthProcessor = {
	/**
	 * @param {Object} options required for response
	 * @return {Promise<Object>}
	 */
	async getResponse({model, value, code, message, count, token, email}) {
		try {
			const meta = AppResponse.getSuccessMeta();
			if (token) {
				meta.token = token;
			}
			_.extend(meta, {status_code: code});
			if (message) {
				meta.message = message;
			}
			if (model.hiddenFields && model.hiddenFields.length > 0) {
				value = _.omit(value, ...model.hiddenFields);
			}
			return AppResponse.format(meta, value);
		} catch (e) {
			throw e;
		}
	},
	/**
	 * @param {Object} auth The auth properties
	 * @param {Object} user The user properties
	 * @return {Promise<String>}
	 */
	async signToken(auth, user) {
		const obj = {
			authId: auth._id,
			uuid: auth.publicId,
			...(_.pick(user, ['username', 'firstName', 'lastName']))
		};
		return jwt.sign(obj, config.get('app.superSecret'),
			{expiresIn: config.get('api.expiresIn')});
	},
	/**
	 * @param {Object} user The main property
	 * @param {Object} object The object properties
	 * @return {Object} returns the api error if main cannot be verified
	 */
	canLogin(user, object) {
		if (!user) {
			return new AppError(lang.get('auth').credential_incorrect, NOT_FOUND);
		}
		let authenticated = object.password && user.password && user.comparePassword(object.password);
		if (!authenticated) {
			return new AppError(lang.get('auth').authentication_failed, UNAUTHORIZED);
		}
		return true;
	}
};

export default AuthProcessor;
