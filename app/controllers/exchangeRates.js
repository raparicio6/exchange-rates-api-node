const Boom = require('@hapi/boom');
const ExchangeRate = require('../models/ExchangeRate');
const { serializeExchangeRates, serializeExchangeRate } = require('../serializers/exchangeRates');
const { getExchangeRates, getCurrencies } = require('../services/fixer');
const { fixerResponseToExchangeRates, fixerResponseToConcurrencies } = require('../mappers/exchangeRates');
const { EURO } = require('../constants');

exports.getExchangeRates = req => {
  const { baseCurrencies, targetCurrencies, collectedAt } = req.query;
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

  return ExchangeRate.find(filter).then(serializeExchangeRates);
};

exports.createExchangeRate = (req, h) => {
  const { baseCurrency, targetCurrency, feePercentage } = req.payload.exchangeRate;
  return getCurrencies().then(concurrenciesResponse => {
    const currencies = fixerResponseToConcurrencies(concurrenciesResponse);
    if (!(baseCurrency in currencies) || !(targetCurrency in currencies)) {
      return new Boom.badRequest(
        `Invalid concurrency. Valid concurrencies are ${JSON.stringify(currencies)}`
      );
    }
    return getExchangeRates([baseCurrency, targetCurrency])
      .then(exchangeRatesResponse => {
        const { date, rates } = fixerResponseToExchangeRates(exchangeRatesResponse);
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
          })
        );
      })
      .then(createdExchangeRate => h.response(serializeExchangeRate(createdExchangeRate)).code(201));
  });
};
