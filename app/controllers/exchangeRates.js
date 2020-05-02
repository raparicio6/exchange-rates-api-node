const ExchangeRate = require('../models/ExchangeRate');
const { serializeExchangeRates } = require('../serializers/exchangeRates');

exports.getExchangeRates = req => {
  const { baseCurrencies, targetCurrencies, createdAt } = req.query;
  const filter = {};
  if (baseCurrencies) {
    filter.baseCurrency = { $in: baseCurrencies };
  }
  if (targetCurrencies) {
    filter.targetCurrency = { $in: targetCurrencies };
  }
  if (createdAt) {
    filter.createdAt = createdAt;
  } else {
    filter.isLastRateOfPair = true;
  }

  return ExchangeRate.find(filter).then(serializeExchangeRates);
};
