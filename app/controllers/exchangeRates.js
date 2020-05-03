const Boom = require('@hapi/boom');
const ExchangeRate = require('../models/ExchangeRate');
const { serializeExchangeRates, serializeExchangeRate } = require('../serializers/exchangeRates');
const { getExchangeRates, getCurrencies } = require('../services/fixer');
const { mapFixerRespToExchangeRates } = require('../mappers/exchangeRates');
const { mapFixerRespToConcurrencies } = require('../mappers/currencies');
const { EURO } = require('../constants');
const logger = require('../logger');

exports.getExchangeRates = req => {
  const { baseCurrencies, targetCurrencies, collectedAt, limit, page } = req.query;
  const filter = {};
  if (baseCurrencies) {
    filter.baseCurrency = { $in: baseCurrencies };
  }
  if (targetCurrencies) {
    filter.targetCurrency = { $in: targetCurrencies };
  }
  if (collectedAt) {
    filter.collectedAt = collectedAt;
  } else {
    filter.isLastRateOfPair = true;
  }

  const paginationOptions = {};
  if (limit) {
    paginationOptions.limit = limit;
  }
  if (page) {
    paginationOptions.page = page;
  }

  return ExchangeRate.paginate(filter, paginationOptions).then(serializeExchangeRates);
};

exports.createExchangeRate = (req, h) => {
  const { baseCurrency, targetCurrency, feePercentage } = req.payload.exchangeRate;
  logger.info(`Starting to create exchange rate with body ${JSON.stringify(req.payload)}`);
  return getCurrencies()
    .then(concurrenciesResponse => {
      const currencies = mapFixerRespToConcurrencies(concurrenciesResponse);
      if (!(baseCurrency in currencies) || !(targetCurrency in currencies)) {
        return new Boom.badRequest(
          `Invalid concurrency. Valid concurrencies are ${JSON.stringify(currencies)}`
        );
      }
      return getExchangeRates([baseCurrency, targetCurrency]).then(exchangeRatesResponse => {
        const { date, rates } = mapFixerRespToExchangeRates(exchangeRatesResponse);
        const originalValue =
          baseCurrency === EURO ? rates[targetCurrency] : rates[targetCurrency] / rates[baseCurrency];
        return ExchangeRate.findOneAndUpdate(
          { baseCurrency, targetCurrency, isLastRateOfPair: true },
          { isLastRateOfPair: false }
        ).then(() =>
          ExchangeRate.create({
            baseCurrency,
            targetCurrency,
            feePercentage,
            originalValue,
            collectedAt: date,
            isLastRateOfPair: true
          }).then(createdExchangeRate => {
            logger.info(
              `Successfully created exchange rate with values ${JSON.stringify(createdExchangeRate)}`
            );
            return h.response(serializeExchangeRate(createdExchangeRate)).code(201);
          })
        );
      });
    })
    .catch(error => {
      logger.error(`Could not create exchange rate. Error: ${error.message}`);
      return new Boom.internal(error.message);
    });
};
