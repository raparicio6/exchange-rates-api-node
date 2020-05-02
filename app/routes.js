const { healthCheck } = require('./controllers/healthCheck');
const { getExchangeRates, createExchangeRate } = require('./controllers/exchangeRates');
const { getCurrencies } = require('./controllers/currencies');
const { GET, POST } = require('./constants');
const { createExchangeRateSchema } = require('./schemas/exchangeRates');

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
  },
  {
    method: [POST],
    path: '/exchange_rates',
    handler: createExchangeRate,
    options: {
      validate: createExchangeRateSchema
    }
  },
  {
    method: [GET],
    path: '/currencies',
    handler: getCurrencies
  }
];
