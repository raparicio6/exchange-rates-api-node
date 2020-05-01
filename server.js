const app = require('./app');
const config = require('./config');
const connectToDatabase = require('./config/db');
const logger = require('./app/logger');

const port = config.common.api.port || 8080;

Promise.resolve().then(() =>
  connectToDatabase()
    .then(() => app.start())
    .then(() => logger.info(`Listening on port: ${port}`))
    .catch(logger.error)
);
