const Boom = require('@hapi/boom');

function checkApiKey(server, { keyValue, keyName, requestSection, routesToExclude }) {
  const scheme = {
    authenticate(req, h) {
      const formattedRoutesToExclude = routesToExclude.map(({ path, verb }) => ({
        path,
        verb: verb.toUpperCase()
      }));
      if (
        formattedRoutesToExclude.find(
          route => route.path === req.path && route.verb === req.method.toUpperCase()
        )
      ) {
        return h.authenticated({ credentials: 'none' });
      }

      const apiKey = req[requestSection][keyName];
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
