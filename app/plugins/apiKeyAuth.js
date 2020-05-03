const Boom = require('@hapi/boom');

function checkApiKey(server, { keyValue, keyName, requestSection, routesToExclude }) {
  const scheme = {
    authenticate(req, h) {
      if (
        routesToExclude &&
        routesToExclude.find(
          route => route.path === req.path && route.verb.toUpperCase() === req.method.toUpperCase()
        )
      ) {
        return h.authenticated({ credentials: 'none' });
      }

      const apiKey = req[requestSection] && req[requestSection][keyName];
      if (apiKey !== keyValue) {
        throw Boom.unauthorized(`Missing ${keyName} in ${requestSection}`);
      }

      return h.authenticated({ credentials: keyValue });
    }
  };
  return scheme;
}

module.exports = {
  name: 'apiKeyAuth',
  version: '1.0.0',
  register(server) {
    server.auth.scheme('apiKey', checkApiKey);
  }
};
