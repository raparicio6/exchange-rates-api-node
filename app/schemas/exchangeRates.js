const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

exports.createExchangeRateSchema = {
  payload: Joi.object({
    exchangeRate: Joi.object({
      baseCurrency: Joi.string().required(),
      targetCurrency: Joi.string().required(),
      feePercentage: Joi.number().required()
    }).required()
  }).required()
};

exports.getExchangeRatesSchema = {
  query: Joi.object({
    collectedAt: Joi.date()
      .format('YYYY-MM-DD')
      .utc()
  }),
  options: {
    allowUnknown: true
  }
};
