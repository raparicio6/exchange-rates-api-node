const { healthCheck } = require('./controllers/healthCheck');
const { getExchangeRates } = require('./controllers/exchangeRates');
const { GET } = require('./constants');

module.exports = [
  {
    method: [GET],
    path: '/health',
    handler: healthCheck
  },
  {
    method: [GET],
    path: '/exchange_rates',
    handler: getExchangeRates
  }
];
