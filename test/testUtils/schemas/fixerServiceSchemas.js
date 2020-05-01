exports.properGetRatesResponse = {
  success: true,
  timestamp: 1588323908,
  base: 'EUR',
  date: '2020-05-01',
  rates: { ARS: 73.143909, USD: 1.097647 }
};

exports.getRatesResponseWithError = {
  success: false,
  error: {
    code: 202,
    type: 'invalid_currency_codes',
    info:
      'You have provided one or more invalid Currency Codes. [Required format: currencies=EUR,USD,GBP,...]'
  }
};
