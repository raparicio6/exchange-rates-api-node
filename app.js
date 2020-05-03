const hapi = require('@hapi/hapi');
const hapiSwagger = require('hapi-swagger');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const { api, auth } = require('./config').common;
const routes = require('./app/routes');
const logger = require('./app/logger');
const pk = require('./package');
const apiKeyAuth = require('./app/plugins/apiKeyAuth');

const port = api.port || 8080;

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
    apiKeyAuth,
    inert,
    vision,
    {
      plugin: hapiSwagger,
      options: swaggerOptions
    }
  ]);

  app.auth.strategy('apiKey', 'apiKey', {
    keyValue: auth.secret,
    keyName: auth.headerName,
    requestSection: 'headers',
    routesToExclude: []
  });
  app.auth.default('apiKey');

  await app.start();
  logger.info(`Listening on port: ${port}`);
};
