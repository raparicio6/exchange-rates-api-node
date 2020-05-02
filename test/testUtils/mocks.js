const nock = require('nock');
const {
  properGetExchangeRatesResponse,
  getExchangeRatesRespWithError,
  getCurrenciesResponseWithError,
  properGetCurrenciesResponse
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

exports.mockGetCurrencies = () =>
  nock(apiBaseUrl)
    .get(/.symbols*/)
    .reply(200, properGetCurrenciesResponse);

exports.mockGetCurrenciesWithError = () =>
  nock(apiBaseUrl)
    .get(/.symbols*/)
    .reply(200, getCurrenciesResponseWithError);
