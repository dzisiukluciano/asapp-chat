module.exports = {
  PORT: process.env.PORT || 8080,
  PREFIX: process.env.PREFIX || 'asapp-chat-backend',
  LOG_LEVEL: process.env.LOG_LEVEL || 'INFO',
  AUTH_URL: process.env.AUTH_URL,
  AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
  AUTH_SECRET: process.env.AUTH_SEC_ENCRYPTED,
  AUTH_SEC_KEY: process.env.AUTH_SEC_KEY,
  AUTH_APP: process.env.AUTH_APP,
  AUTH_CONNECTION_TYPE: process.env.AUTH_CONNECTION_TYPE || 'Username-Password-Authentication',
  AUTH_CACHE_KEY: 'asapp-mgmnt-token',
  ERROR_STATUS_CODE: 500,
};
