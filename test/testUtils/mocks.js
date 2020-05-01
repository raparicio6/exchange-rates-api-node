const nock = require('nock');
const { properGetRatesResponse, getRatesResponseWithError } = require('./schemas/fixerServiceSchemas');
const {
  fixer: { apiBaseUrl }
} = require('../../config').common;

exports.mockGetRates = () =>
  nock(apiBaseUrl)
    .get(/.latest*/)
    .reply(200, properGetRatesResponse);

exports.mockGetRatesWithError = () =>
  nock(apiBaseUrl)
    .get(/.latest*/)
    .reply(200, getRatesResponseWithError);
