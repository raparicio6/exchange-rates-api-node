const request = require('axios');
const {
  fixer: { apiBaseUrl, apiKey }
} = require('../../config').common;
const { GET, EURO } = require('../constants');

const req = options =>
  request(options).then(response => {
    if (!response.data.success) {
      return Promise.reject({ message: response.data.error.type });
    }

    return response.data;
  });

exports.getExchangeRates = (symbols, base = EURO) => {
  const options = {
    method: GET,
    url: `${apiBaseUrl}/latest`,
    params: { access_key: apiKey, base, symbols: symbols.join() }
  };
  return req(options);
};

exports.getCurrencies = () => {
  const options = {
    method: GET,
    url: `${apiBaseUrl}/symbols`,
    params: { access_key: apiKey }
  };
  return req(options);
};
