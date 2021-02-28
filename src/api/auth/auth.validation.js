import Validator from 'validatorjs';

/**
 * The User Validation class
 */
const AuthValidation = {
	/**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	async login(body = {}) {
		const rules = {
			username: 'required|string',
			password: 'required|min:6'
		};
		const validator = new Validator(body, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
};

export default AuthValidation;
