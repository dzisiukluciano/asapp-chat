const Router = require('express').Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('../configs/swaggerConfig');
const { PREFIX } = require('../configs/appConfig');


const swaggerSpec = swaggerJsdoc(swaggerConfig.options);
Router.use(`/api/${PREFIX}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerConfig.uiOptions));

module.exports = Router;
