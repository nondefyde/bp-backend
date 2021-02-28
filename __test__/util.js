import Auth from '../src/rest/auth/auth.model';

/**
 * Empty collections
 */
export const EmptyAuthCollections = async () => {
	await Auth.remove({});
};
