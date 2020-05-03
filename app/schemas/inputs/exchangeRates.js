const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { auth } = require('../../../config').common;

exports.createExchangeRateSchema = {
  payload: Joi.object({
    exchangeRate: Joi.object({
      baseCurrency: Joi.string()
        .required()
        .example('EUR'),
      targetCurrency: Joi.string()
        .required()
        .example('USD'),
      feePercentage: Joi.number()
        .min(0)
        .required()
        .example(15)
    }).required()
  }).required(),
  headers: Joi.object({
    [auth.headerName]: Joi.string()
  }).unknown()
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
  }),
  headers: Joi.object({
    [auth.headerName]: Joi.string()
  }).unknown()
};
