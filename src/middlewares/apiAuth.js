const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const {
  AUTH_HEADER,
  AUTH_DOMAIN,
  AUTH_CLIENT_ID,
} = require('../configs/appConfig');

const ApiAuth = module.exports;

const getToken = (req) => {
  let token;
  const header = req.headers[AUTH_HEADER];
  if (header) {
    const [, jwToken] = header.split(' ');
    token = jwToken;
  }

  return token;
};

ApiAuth.checkJwt = jwt({
  getToken,
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: AUTH_CLIENT_ID,
  issuer: `${AUTH_DOMAIN}/`,
  algorithms: ['RS256'],
});
