const { existsSync: exists } = require('fs');
const { resolve } = require('path');
const yamljs = require('yamljs');

const debug = console.log;

module.exports.load = (location, override = false) => {
  const configFile = process.env.APP_ENV ? `env-${process.env.APP_ENV}.yml` : 'env-local.yml';
  const envLocation = resolve(location, configFile);
  debug(`Loading environment from ${envLocation}`);

  if (exists(envLocation)) {
    const env = yamljs.load(envLocation);

    env.forEach((e) => {
      if (override || process.env[e.name] === undefined) {
        process.env[e.name] = e.value;
      }
    });
  } else {
    debug(`No ${configFile} file found.`);
  }
};
