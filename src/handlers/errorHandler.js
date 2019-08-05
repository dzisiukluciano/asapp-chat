const logger = require('../utils/logger').getLogger('ErrorHandler');
const ResponseHandler = require('./responseHandler');

const ErrorHandler = module.exports;

ErrorHandler.validationError = (error) => {
  const errors = error.details.map(detail => ({ [detail.context.key]: `${error.name} ${detail.message}` }));

  return ResponseHandler.error(errors);
};

ErrorHandler.dbError = (error) => {
  logger.error(error.name, error.message);

  if (error.message === 'The key does not exist on the server') {
    return ResponseHandler.notFound();
  }

  const errors = [{ [error.name]: error.message }];

  return ResponseHandler.error(errors, error.statusCode);
};

ErrorHandler.customValidationError = (field, message) => ResponseHandler.error([{ [field]: message }]);
