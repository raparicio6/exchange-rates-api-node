const request = require('axios');
const {
  fixer: { apiBaseUrl, apiKey }
} = require('../../config').common;
const { GET, EURO } = require('../constants');

exports.SERVICE_NAME = 'Fixer service';

exports.getRates = (symbols, base = EURO) => {
  const options = {
    method: GET,
    url: `${apiBaseUrl}/latest`,
    params: { access_key: apiKey, base, symbols: symbols.join() }
  };
  return request(options).then(response => response.data);
};
