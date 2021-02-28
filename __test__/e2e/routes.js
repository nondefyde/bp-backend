import { RESOURCE_NAME } from '../_seeds/resource.seed';

export const TEST_API_KEY = process.env.API_KEY || 'API_KEY';
export const TEST_API_VERSION = 'v1';
export const TEST_BASE_URL = `/api/${TEST_API_VERSION}`;


export const SOCIAL_AUTH_URL = `${TEST_BASE_URL}/socialAuth`;
export const REGISTER_URL = `${TEST_BASE_URL}/signUp`;
export const LOGIN_URL = `${TEST_BASE_URL}/signIn`;
export const VERIFY_URL = `${TEST_BASE_URL}/verifyCode`;
export const VERIFY_LINK_URL = `${TEST_BASE_URL}/verifyLink`;
export const SEND_RESET_URL = `${TEST_BASE_URL}/sendResetPasswordCodeLink`;
export const RESET_PASSWORD_URL = `${TEST_BASE_URL}/resetPassword`;
export const CHANGE_PASSWORD_URL = `${TEST_BASE_URL}/changePassword`;
export const SEND_VERIFICATION_URL = `${TEST_BASE_URL}/sendVerification`;
export const FIND_EMAIL_URL = `${TEST_BASE_URL}/findByEmail`;

export const ALL_RESOURCES_URL = `${TEST_BASE_URL}/resources/all`;
export const RESOURCE_URL = `${TEST_BASE_URL}/resources/${RESOURCE_NAME}`;

export const TEST_GRAPHQL_BASE_URL = `/api/${TEST_API_VERSION}/graphql`;
