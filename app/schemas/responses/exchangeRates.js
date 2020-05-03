const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const exchangeRate = Joi.object({
  baseCurrency: Joi.string().example('EUR'),
  targetCurrency: Joi.string().example('USD'),
  originalValue: Joi.number().example(25),
  feePercentage: Joi.number().example(10),
  collectedAt: Joi.date().format('YYYY-MM-DD'),
  feeAmount: Joi.number().example(2.5),
  valueAfterFeeApplied: Joi.number().example(27.5)
});

exports.createExchangeRateRespSchema = Joi.object({ exchangeRate });

exports.createExchangeInvalidCurrency = Joi.object({
  statusCode: Joi.number().example(400),
  error: Joi.string().example('Bad Request'),
  message: Joi.string()
});

exports.getExchangeRatesRespSchema = Joi.object({
  exchangeRates: Joi.array().items(exchangeRate),
  limit: Joi.number().example(10),
  page: Joi.number().example(1),
  prevPage: Joi.number().allow(null),
  nextPage: Joi.number().allow(null),
  totalPages: Joi.number().example(1),
  totalExchangeRates: Joi.number().example(1)
});
