const Joi = require('joi');
const { validationError } = require('../handlers/errorHandler');

const SchemaValidator = module.exports;

SchemaValidator.validateBody = schema => (
  (req, res, next) => {
    const validation = Joi.validate(req.body, schema);
    if (validation.error) {
      const resp = validationError(validation.error);
      res.status(resp.status).json(resp.data);
    } else {
      next();
    }
  }
);

SchemaValidator.validateQueryParams = schema => (
  (req, res, next) => {
    const validation = Joi.validate(req.query, schema);
    if (validation.error) {
      const resp = validationError(validation.error);
      res.status(resp.status).json(resp.data);
    } else {
      next();
    }
  }
);
