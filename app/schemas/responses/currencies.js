const Joi = require('@hapi/joi');

exports.getCurrenciesRespSchema = Joi.object({
  currencies: Joi.object({
    CON1: Joi.string().example('United Arab Emirates Dirham'),
    CON2: Joi.string().example('Euro'),
    CON3: Joi.string().example('Bitcoin')
  }).unknown()
});
