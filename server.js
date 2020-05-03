const { startApp } = require('./app');
const connectToDatabase = require('./config/db');
const logger = require('./app/logger');

Promise.resolve()
  .then(() => connectToDatabase().then(() => startApp()))
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
