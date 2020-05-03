const { healthCheck } = require('./controllers/healthCheck');
const { getExchangeRates, createExchangeRate } = require('./controllers/exchangeRates');
const { getCurrencies } = require('./controllers/currencies');
const { GET, POST } = require('./constants');
const {
  createExchangeRateSchema,
  getExchangeRatesSchema,
  getCurrenciesSchema,
  healthCheckSchema
} = require('./schemas/inputs/exchangeRates');
const {
  createExchangeRateRespSchema,
  getCurrenciesRespSchema,
  getExchangeRatesRespSchema,
  healthCheckRespSchema,
  createExchangeInvalidCurrency
} = require('./schemas/responses/exchangeRates');

module.exports = [
  {
    method: [GET],
    path: '/health',
    handler: healthCheck,
    options: {
      validate: healthCheckSchema,
      response: { schema: healthCheckRespSchema },
      tags: ['api']
    }
  },
  {
    method: [GET],
    path: '/exchange_rates',
    handler: getExchangeRates,
    options: {
      validate: getExchangeRatesSchema,
      response: { schema: getExchangeRatesRespSchema },
      tags: ['api']
    }
  },
  {
    method: [POST],
    path: '/exchange_rates',
    handler: createExchangeRate,
    options: {
      validate: createExchangeRateSchema,
      response: {
        status: {
          201: createExchangeRateRespSchema,
          400: createExchangeInvalidCurrency
        }
      },
      tags: ['api']
    }
  },
  {
    method: [GET],
    path: '/currencies',
    handler: getCurrencies,
    options: {
      validate: getCurrenciesSchema,
      response: { schema: getCurrenciesRespSchema },
      tags: ['api']
    }
  }
];
