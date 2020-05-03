const Boom = require('@hapi/boom');
const ExchangeRate = require('../models/ExchangeRate');
const { serializeExchangeRates, serializeExchangeRate } = require('../serializers/exchangeRates');
const { getExchangeRates, getCurrencies } = require('../services/fixer');
const { mapFixerRespToConcurrencies, mapFixerRespToExchangeRates } = require('../mappers/exchangeRates');
const { EURO } = require('../constants');

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
          { isLastRateOfPair: false },
          { useFindAndModify: false }
        ).then(() =>
          ExchangeRate.create({
            baseCurrency,
            targetCurrency,
            feePercentage,
            originalValue,
            collectedAt: date,
            isLastRateOfPair: true
          }).then(createdExchangeRate => h.response(serializeExchangeRate(createdExchangeRate)).code(201))
        );
      });
    })
    .catch(error => new Boom.internal(error.message));
};
