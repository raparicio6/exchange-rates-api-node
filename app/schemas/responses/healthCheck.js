const Joi = require('@hapi/joi');

exports.healthCheckRespSchema = Joi.object({
  uptime: Joi.number().example(7)
});
