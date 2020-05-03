const nock = require('nock');
const {
  properGetExchangeRatesResponse,
  getExchangeRatesRespWithError,
  getCurrenciesResponseWithError,
  properGetCurrenciesResponse,
  serviceUnavailableResponse
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

exports.mockFixerServiceUnavailable = () => {
  nock(apiBaseUrl)
    .post(/.*/)
    .reply(503, serviceUnavailableResponse);
  nock(apiBaseUrl)
    .get(/.*/)
    .reply(503, serviceUnavailableResponse);
};
