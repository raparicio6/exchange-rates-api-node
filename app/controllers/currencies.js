const Boom = require('@hapi/boom');
const { getCurrencies } = require('../services/fixer');
const { serializeCurrencies } = require('../serializers/currencies');
const logger = require('../logger');

exports.getCurrencies = () =>
  getCurrencies()
    .then(serializeCurrencies)
    .catch(error => {
      logger.error(`Could not get currencies. Error: ${error.message}`);
      return new Boom.internal(error.message);
    });
