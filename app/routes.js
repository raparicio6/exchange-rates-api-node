const { healthCheck } = require('./controllers/healthCheck');
const { GET } = require('./constants');

module.exports = [
  {
    method: [GET],
    path: '/health',
    handler: healthCheck
  }
];
