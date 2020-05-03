const { healthCheck } = require('./controllers/healthCheck');
const { getExchangeRates, createExchangeRate } = require('./controllers/exchangeRates');
const { getCurrencies } = require('./controllers/currencies');
const { GET, POST } = require('./constants');
const { createExchangeRateSchema, getExchangeRatesSchema } = require('./schemas/exchangeRates');

module.exports = [
  {
    method: [GET],
    path: '/health',
    handler: healthCheck,
    options: {
      tags: ['api']
    }
  },
  {
    method: [GET],
    path: '/exchange_rates',
    handler: getExchangeRates,
    options: {
      validate: getExchangeRatesSchema,
      tags: ['api']
    }
  },
  {
    method: [POST],
    path: '/exchange_rates',
    handler: createExchangeRate,
    options: {
      validate: createExchangeRateSchema,
      tags: ['api']
    }
  },
  {
    method: [GET],
    path: '/currencies',
    handler: getCurrencies,
    options: {
      tags: ['api']
    }
  }
];
