const _ = require('lodash');

const SerializeData = module.exports;

const objectsKeyToFormat = (rawObj, fn = _.camelCase) => {
  const newObj = {};

  if (rawObj) {
    Object.keys(rawObj).forEach((key) => {
      let value = rawObj[key];

      if (value && (Array.isArray(value) || typeof value === 'object')) {
        value = SerializeData.fromPostgres(value);
      }

      newObj[fn(key)] = value;
    });
  }

  return newObj;
};

SerializeData.toPostgres = (data) => {
  if (Array.isArray(data)) {
    return data.map(dat => (typeof dat === 'object' ? objectsKeyToFormat(dat, _.snakeCase) : dat));
  }

  const dateOptions = { utc: true, fieldsMapper: _.camelCase };

  return (typeof data === 'object' && Object.keys(data).length)
    ? objectsKeyToFormat(data, _.snakeCase, dateOptions)
    : data;
};

SerializeData.fromPostgres = (data) => {
  if (Array.isArray(data)) {
    return data.map(dat => (typeof dat === 'object' ? objectsKeyToFormat(dat, _.camelCase) : dat));
  }

  return (typeof data === 'object' && Object.keys(data).length) ? objectsKeyToFormat(data, _.camelCase) : data;
};

SerializeData.toSnakeCase = value => (value !== '*' ? _.snakeCase(value) : value);
