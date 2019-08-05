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
        url: '/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
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
