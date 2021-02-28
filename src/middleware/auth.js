import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import config from 'config';
import lang from '../lang';
import AppError from '../lib/app-error';
import {UNAUTHORIZED} from '../utils/constants';

export default (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.get('auth.encryption_key'), async (err, decoded) => {
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
				next();
			}
		});
	} else {
		const appError = new AppError(lang.get('auth').AUTH100, UNAUTHORIZED);
		return next(appError);
	}
};
