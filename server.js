const app = require('./app');
const config = require('./config');
const startDatabase = require('./config/db');

const port = config.common.api.port || 8080;

Promise.resolve().then(() =>
  startDatabase()
    .then(() => app.start())
    .then(() => console.log(`Listening on port: ${port}`))
    .catch(console.error)
);
