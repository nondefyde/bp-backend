import Validator from 'validatorjs';
import AppValidation from '../_core/app.validation';

/**
 * The User Validation class
 */
class UserValidation extends AppValidation {
	/**
	 * @param {Object} obj The object to validate
	 * @return {Object} Validator
	 */
	update(obj) {
		const rules = {
			'firstName': 'string',
			'lastName': 'string'
		};
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
}

export default UserValidation;
