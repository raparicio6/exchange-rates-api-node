const request = require('axios');
const {
  fixer: { apiBaseUrl, apiKey }
} = require('../../config').common;
const { GET, EURO } = require('../constants');

exports.getExchangeRates = (symbols, base = EURO) => {
  const options = {
    method: GET,
    url: `${apiBaseUrl}/latest`,
    params: { access_key: apiKey, base, symbols: symbols.join() }
  };
  return request(options).then(response => response.data);
};

exports.getCurrencies = () => {
  const options = {
    method: GET,
    url: `${apiBaseUrl}/symbols`,
    params: { access_key: apiKey }
  };
  return request(options).then(response => response.data);
};
