const _ = require('lodash');
const { ERROR_STATUS_CODE } = require('../configs/appConfig');
const ErrorHandler = require('./errorHandler');

const ResponseHandler = module.exports;

const buildResponse = (status, data) => ({ status, data });

ResponseHandler.success = data => buildResponse(200, data);

ResponseHandler.error = (errors, statusCode = ERROR_STATUS_CODE) => buildResponse(statusCode, { errors });

ResponseHandler.notFound = data => buildResponse(204, data);

ResponseHandler.created = data => buildResponse(201, data);

ResponseHandler.deleted = () => buildResponse(204, {});

ResponseHandler.validatePromise = (promise) => {
  const valid = promise instanceof Promise;

  if (!valid) throw new Error('ResponseHandler: First param should be a promise');

  return valid;
};

ResponseHandler.resolveResponse = async (promise, options = {}) => {
  ResponseHandler.validatePromise(promise);
  const { defaultResponse = {}, notFoundHandler = ResponseHandler.notFound } = options;

  let records = defaultResponse;

  let handler = ResponseHandler.success;

  try {
    records = await promise;
    if (_.isEmpty(records)) handler = notFoundHandler;
  } catch (err) {
    return ErrorHandler.dbError(err);
  }

  return handler(records);
};

ResponseHandler.resolveCreateResponse = async (promise) => {
  ResponseHandler.validatePromise(promise);

  let resp = {};

  try {
    const record = await promise;
    resp = ResponseHandler.created(record);
  } catch (err) {
    resp = ErrorHandler.dbError(err);
  }

  return resp;
};
