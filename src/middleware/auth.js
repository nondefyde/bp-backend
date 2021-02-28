import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import config from 'config';
import lang from '../lang';
import AppError from '../lib/app-error';
import {UNAUTHORIZED} from '../utils/constants';
import Auth from '../api/auth/auth.model.js';

export default (req, res, next) => {
	const token = req.headers['authorization'];
	// decode token
	if (token && token.split(' ').length > 0) {
		// verifies secret and checks exp
		jwt.verify(token.split(' ')[1], config.get('app.superSecret'), async (err, decoded) => {
			if (err) {
				let message = '';
				if (err.name) {
					if (err.name === 'TokenExpiredError') {
						message = 'You are not logged in!';
					} else {
						message = 'Failed to authenticate token';
					}
				}
				const appError = new AppError(message, UNAUTHORIZED, null);
				return next(appError);
			} else {
				req.authId = decoded.authId;
				const auth = await Auth.findById(req.authId);
				if (!auth) {
					const appError = new AppError(lang.get('auth').invalid_user_access, UNAUTHORIZED);
					return next(appError);
				}
				next();
			}
		});
	} else {
		const appError = new AppError(lang.get('auth').invalid_user_access, UNAUTHORIZED);
		return next(appError);
	}
};
