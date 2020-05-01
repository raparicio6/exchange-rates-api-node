const hapi = require('@hapi/hapi');
const config = require('./config');
const routes = require('./app/routes');

const port = config.common.api.port || 8080;

const app = hapi.server({
  port,
  routes: {
    cors: true
  }
});

app.route(routes);

module.exports = app;
