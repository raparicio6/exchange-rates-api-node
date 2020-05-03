const hapi = require('@hapi/hapi');
const hapiSwagger = require('hapi-swagger');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const config = require('./config');
const routes = require('./app/routes');
const logger = require('./app/logger');
const pk = require('./package');

const port = config.common.api.port || 8080;

const swaggerOptions = {
  info: {
    title: pk.name,
    version: pk.version
  }
};

const app = hapi.server({
  port,
  routes: {
    cors: true
  }
});

app.route(routes);

exports.app = app;

exports.startApp = async () => {
  await app.register([
    inert,
    vision,
    {
      plugin: hapiSwagger,
      options: swaggerOptions
    }
  ]);

  await app.start();
  logger.info(`Listening on port: ${port}`);
};
