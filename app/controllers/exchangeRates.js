const ExchangeRate = require('../models/ExchangeRate');
const { serializeExchangeRates, serializeExchangeRate } = require('../serializers/exchangeRates');
const { getExchangeRates } = require('../services/fixer');
const { fixerResponseToExchangeRates } = require('../mappers/exchangeRates');
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
  return getExchangeRates([baseCurrency, targetCurrency])
    .then(response => {
      const { date, rates } = fixerResponseToExchangeRates(response);
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
};
