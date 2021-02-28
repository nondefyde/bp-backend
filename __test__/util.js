import Auth from '../src/api/auth/auth.model';
import User from '../src/api/auth/auth.model';

/**
 * Empty collections
 */
export const EmptyAuthCollections = async () => {
	await Auth.remove({});
	await User.remove({});
};
