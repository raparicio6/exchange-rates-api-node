const nock = require('nock');
const {
  properGetExchangeRatesResponse,
  getExchangeRatesRespWithError
} = require('./schemas/fixerServiceSchemas');
const {
  fixer: { apiBaseUrl }
} = require('../../config').common;

exports.mockGetExchangeRates = () =>
  nock(apiBaseUrl)
    .get(/.latest*/)
    .reply(200, properGetExchangeRatesResponse);

exports.mockGetExchangeRatesWithError = () =>
  nock(apiBaseUrl)
    .get(/.latest*/)
    .reply(200, getExchangeRatesRespWithError);
