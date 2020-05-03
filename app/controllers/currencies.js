const Boom = require('@hapi/boom');
const { getCurrencies } = require('../services/fixer');
const { serializeCurrencies } = require('../serializers/currencies');

exports.getCurrencies = () =>
  getCurrencies()
    .then(serializeCurrencies)
    .catch(error => new Boom.internal(error.message));
