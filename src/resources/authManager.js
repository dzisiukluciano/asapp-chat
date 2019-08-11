const request = require('request-promise');
const { AuthenticationClient } = require('auth0');
const SimpleCrypto = require('simple-crypto-js').default;
const cache = require('../utils/cache');
const logger = require('../utils/logger').getLogger('AuthManager');
const {
  AUTH_CLIENT_ID,
  AUTH_SECRET,
  AUTH_SEC_KEY,
  AUTH_DOMAIN,
  AUTH_CACHE_KEY,
  AUTH_CONNECTION_TYPE,
} = require('../configs/appConfig');

const crypto = new SimpleCrypto(AUTH_SEC_KEY);

const auth0 = new AuthenticationClient({
  domain: 'asappchat.auth0.com',
  clientId: AUTH_CLIENT_ID,
  clientSecret: crypto.decrypt(AUTH_SECRET),
});

const AuthManager = module.exports;

const authOptions = {
  method: 'POST',
  url: `${AUTH_DOMAIN}/oauth/token`,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    grant_type: 'client_credentials',
    client_id: AUTH_CLIENT_ID,
    client_secret: crypto.decrypt(AUTH_SECRET),
    audience: `${AUTH_DOMAIN}/api/v2/`,
  },
  json: true,
};

const usersOptions = async body => ({
  method: 'POST',
  url: `${AUTH_DOMAIN}/api/v2/users`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${await AuthManager.getManagementToken()}`,
  },
  body,
  json: true,
});

const generateEmail = data => `${data.username}@asapp.com`;

AuthManager.getManagementToken = async () => {
  let token = await cache.get(AUTH_CACHE_KEY);
  if (!token) {
    logger.info('Getting auth token');
    const { access_token: accessToken, expires_in: ttl } = await request(authOptions);
    cache.set(AUTH_CACHE_KEY, accessToken, ttl);
    token = accessToken;
  } else {
    logger.info('token retrieved from cache');
  }

  return token;
};

AuthManager.registerUser = async (data) => {
  const body = {
    ...data,
    email: generateEmail(data),
    email_verified: true,
    connection: AUTH_CONNECTION_TYPE,
  };
  const options = await usersOptions(body);
  const response = await request(options);

  return response;
};

AuthManager.login = async (username, password) => {
  const data = {
    username,
    password,
    scope: 'openid',
  };
  const { id_token: token } = await auth0.passwordGrant(data);

  return token;
};
