const mongoose = require('mongoose');
const { host, port, name, username, password } = require('../config').common.database;
const logger = require('../app/logger');

const MAX_ATTEMPTS = 30;

const connectionString = username
  ? `mongodb://${username}:${password}@${host}:${port}/${name}`
  : `mongodb://${host}:${port}/${name}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

let attempts = 0;
const connectWithRetry = () =>
  mongoose.connect(connectionString, options).catch(error => {
    attempts++;
    if (attempts <= MAX_ATTEMPTS) {
      logger.error(
        `MongoDB connection unsuccessful with error ${JSON.stringify(error)}, retrying again in 5 seconds`
      );
      setTimeout(connectWithRetry, 5000);
    } else {
      logger.error(
        `MongoDB connection unsuccessful with error ${JSON.stringify(
          error
        )}, maximum number of attempts reached`
      );
    }
  });

module.exports = connectWithRetry;
