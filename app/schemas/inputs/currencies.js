const Joi = require('@hapi/joi');
const { auth } = require('../../../config').common;

exports.getCurrenciesSchema = {
  headers: Joi.object({
    [auth.headerName]: Joi.string()
  }).unknown()
};
