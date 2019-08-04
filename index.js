const { resolve } = require('path');
require('./src/utils/setupEnv').load(resolve(process.cwd()));
const express = require('express');
const bodyParser = require('body-parser');
const { PREFIX, PORT } = require('./src/configs/appConfig');
const log4js = require('./src/utils/logger');
const errorHandler = require('./src/middlewares/errorHandler');
const swagger = require('./src/middlewares/swagger');
const jsonContentType = require('./src/middlewares/jsonContentType')
const routes = require('./src/routes');

const logger = log4js.getLogger(PREFIX);

const app = express();
app.use(bodyParser.json());

// HC backward compatibility with skeleton code (no payload should be needed, overrided inside routes.js)
app.post('/check', (req, res) => res.status(200).send({ health: 'ok' }));

app.use(`/api/${PREFIX}`, routes);
app.use(log4js.connectLogger(logger, { level: 'auto' }));

app.use(swagger);
app.use(errorHandler);
app.use(jsonContentType);
app.start = port => app.listen(port, err => (err ? logger.error(err) : logger.info(`Web server listening on port ${port}`)));

module.exports = app.start(PORT);
