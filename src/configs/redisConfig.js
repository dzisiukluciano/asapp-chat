module.exports = {
  REDIS_CONFIG: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || '6379',
    retry_strategy: (options) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 20) {
        return new Error('Retry attempts exhausted');
      }

      // reconnect after
      return Math.min(options.attempt * 1000, 3000);
    },
  },
  REDIS_SCAN_COUNT: parseInt(process.env.REDIS_SCAN_COUNT, 10) || 100,
  CACHE_DEBUG: process.env.DB_DEBUG === 'true',
};
