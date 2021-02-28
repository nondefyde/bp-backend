import Auth from './auth.model';
import AuthValidation from './auth.validation';
import AuthProcessor from './auth.processor';
import _ from 'lodash';
import lang from '../../lang';
import mongoose from 'mongoose';
import UserProcessor from '../user/user.processor';
import AppError from '../../lib/app-error';
import {BAD_REQUEST, OK} from '../../utils/constants';

const AuthController = {
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async signIn(req, res, next) {
		let session;
		try {
			session = await mongoose.startSession();
			await session.startTransaction();
			const obj = req.body;
			const validator = await AuthValidation.signIn(obj);
			if (!validator.passed) {
				return next(new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors));
			}
			const auth = await Auth.findOne({email: obj.email}).select('+password');
			const canLogin = await AuthProcessor.canLogin(auth, obj);
			if (canLogin instanceof AppError) {
				return next(canLogin);
			}
			const user = await UserProcessor.getUser(auth._id, obj, session);
			const token = await AuthProcessor.signToken({auth, user});
			const response = await AuthProcessor.getResponse({
				token,
				model: Auth,
				code: OK,
				value: {
					...auth.toJSON(),
					user: _.pick(user, ['email', 'displayName', 'firstName', 'lastName', 'mobile', 'avatar'])
				}
			});
			await session.commitTransaction();
			return res.status(OK).json(response);
		} catch (e) {
			await session.abortTransaction();
			return next(e);
		}
	}
};

export default AuthController;
