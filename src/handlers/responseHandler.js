const { ERROR_STATUS_CODE } = require('../configs/appConfig');
const ErrorHandler = require('./errorHandler');

const ResponseHandler = module.exports;

const buildResponse = (status, data) => ({ status, data });

ResponseHandler.success = data => buildResponse(200, data);

ResponseHandler.error = (errors, statusCode = ERROR_STATUS_CODE) => buildResponse(statusCode, { errors });

ResponseHandler.notFound = data => buildResponse(404, data);

ResponseHandler.created = data => buildResponse(201, data);

ResponseHandler.deleted = () => buildResponse(204, {});

ResponseHandler.resolveResponse = async (promise) => {
  let resp = {};

  try {
    const result = await promise;
    resp = ResponseHandler.success(result);
  } catch (err) {
    return ErrorHandler.dbError(err);
  }

  return resp;
};

ResponseHandler.resolveCreateResponse = async (promise) => {
  let resp = {};

  try {
    const result = await promise;
    resp = ResponseHandler.created(result);
  } catch (err) {
    resp = ErrorHandler.dbError(err);
  }

  return resp;
};
