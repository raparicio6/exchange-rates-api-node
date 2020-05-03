const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

exports.createExchangeRateSchema = {
  payload: Joi.object({
    exchangeRate: Joi.object({
      baseCurrency: Joi.string().required(),
      targetCurrency: Joi.string().required(),
      feePercentage: Joi.number()
        .min(0)
        .required()
    }).required()
  }).required()
};

exports.getExchangeRatesSchema = {
  query: Joi.object({
    baseCurrencies: Joi.alternatives(Joi.array().items(Joi.string()), Joi.string()),
    targetCurrencies: Joi.alternatives(Joi.array().items(Joi.string()), Joi.string()),
    collectedAt: Joi.date()
      .format('YYYY-MM-DD')
      .utc(),
    page: Joi.number().min(1),
    limit: Joi.number().min(1)
  })
};
