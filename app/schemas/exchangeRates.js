const Joi = require('@hapi/joi');

exports.createExchangeRateSchema = {
  payload: Joi.object({
    exchangeRate: Joi.object({
      baseCurrency: Joi.string().required(),
      targetCurrency: Joi.string().required(),
      feePercentage: Joi.number().required()
    }).required()
  }).required()
};
