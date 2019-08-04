const _ = require('lodash');
const redis = require('redis');
const Promise = require('bluebird');
const { REDIS_CONFIG, REDIS_SCAN_COUNT, CACHE_DEBUG: DEBUG } = require('../configs/redisConfig');
const logger = require('./logger').getLogger('Cache');

Promise.promisifyAll(redis.RedisClient.prototype);

const Cache = module.exports;

let client;

const getClient = () => {
  try {
    if (!client || !client.connected) {
      Cache.init(REDIS_CONFIG);
    }
  } catch (err) {
    logger.error('Error getting RedisClient');
  }

  return client;
};

Cache.init = () => {
  client = redis.createClient(REDIS_CONFIG);
  client.on('connect', () => logger.info(`Redis client connected: ${JSON.stringify(REDIS_CONFIG)}`));
  client.on('error', () => logger.error('Redis connection error '));
};

Cache.set = (key, value, expire = 300) => {
  if (DEBUG) logger.info(`Saving key: ${key}`);
  getClient().set(key, _.isObject(value) ? JSON.stringify(value) : value);
  getClient().expire(key, expire);
};

Cache.get = async (key) => {
  if (DEBUG) logger.info(`Searching key: ${key}`);

  return getClient().connected ? getClient().getAsync(key) : undefined;
};

Cache.remember = async (key, resolver, expire = 300) => {
  const cachedValue = await Cache.get(key);

  if (cachedValue) {
    if (DEBUG) logger.info(`Cache hit: ${key}`);

    return JSON.parse(cachedValue);
  }
  const resolveValue = await resolver();

  if (resolveValue) {
    try {
      Cache.set(key, resolveValue, expire);
    } catch (err) {
      logger.warn(`Unable to set remembered value for key ${key} err: ${err}`);
    }

    return resolveValue;
  }

  return null;
};

Cache.del = async (key) => {
  if (DEBUG) logger.info(`Delete cache: ${key}`);

  return getClient().delAsync(key);
};

Cache.scan = async (key) => {
  let keys = [];

  if (!key) return keys;

  let cursor = 0;
  let fetch = true;

  while (fetch) {
    // eslint-disable-next-line no-await-in-loop
    const [nCursor, nKeys] = await getClient().scanAsync(cursor, 'MATCH', `${key}*`, 'COUNT', REDIS_SCAN_COUNT);
    keys = [...keys, ...nKeys];
    cursor = nCursor;
    if (!parseInt(cursor, 10)) fetch = false;
  }

  return keys;
};

Cache.invalidateKeys = async (prefix) => {
  const entries = await Cache.scan(prefix);
  await Promise.all(entries.map(entry => Cache.del(entry)));
  if (DEBUG) logger.info(`Entries cleaned for ${prefix}`);
};
