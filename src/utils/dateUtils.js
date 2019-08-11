const moment = require('moment-timezone');
const { DATE_FORMAT, TIMEZONE } = require('../configs/appConfig');

const DateUtils = module.exports;

DateUtils.parseDate = (val, utc = true) => (
  utc ? moment.utc(val).tz(TIMEZONE).format(DATE_FORMAT) : moment(val).format(DATE_FORMAT));
