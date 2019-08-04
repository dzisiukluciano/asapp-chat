const { PREFIX } = require('./appConfig');
const { version, title, description } = require('../../package.json');

const swaggerConfig = module.exports;

swaggerConfig.options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version,
      description,
      title,
    },
    servers: [
      {
        url: `/api/${PREFIX}`,
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-AUTH',
        },
      },
    },
  },
  apis: ['./src/controllers/*.js'],
};

swaggerConfig.uiOptions = {
  explorer: false,
  swaggerOptions: {
    docExpansion: 'none',
    validatorUrl: null,
  },
};
