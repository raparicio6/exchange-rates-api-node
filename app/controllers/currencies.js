const Boom = require('@hapi/boom');
const { getCurrencies } = require('../services/fixer');
const { serializeCurrencies } = require('../serializers/exchangeRates');

exports.getCurrencies = () =>
  getCurrencies().then(response => {
    if (!response.success) {
      return new Boom.internal(response.error.type);
    }
    return serializeCurrencies(response);
  });
