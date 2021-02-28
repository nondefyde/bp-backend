import bcrypt from 'bcrypt-nodejs';
import mongoose, {Schema} from 'mongoose';

/**
 * Auth Schema
 */
const AuthModel = new Schema({
	publicId: {
		type: String,
		unique: true,
		index: true
	},
	username: {
		type: String,
		unique: true,
		index: true
	},
	password: {
		type: String,
		select: false
	},
	deleted: {
		type: Boolean,
		default: false,
		select: false
	}
}, {
	autoCreate: true,
	timestamps: true,
	toJSON: {virtuals: true}
});

AuthModel.statics.hiddenFields = ['password', 'deleted'];


AuthModel.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	user.password = bcrypt.hashSync(user.password);
	next();
});

/**
 * @param {String} password The password to compare against
 * @return {Boolean} The result of the comparison
 */
AuthModel.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
/**
 * @typedef AuthModel
 */
export default mongoose.model('Auth', AuthModel);
