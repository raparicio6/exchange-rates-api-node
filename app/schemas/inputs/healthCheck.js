const Joi = require('@hapi/joi');
const { auth } = require('../../../config').common;

exports.healthCheckSchema = {
  headers: Joi.object({
    [auth.headerName]: Joi.string()
  }).unknown()
};
