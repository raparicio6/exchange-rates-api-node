exports.properGetExchangeRatesResponse = {
  success: true,
  timestamp: 1588323908,
  base: 'EUR',
  date: '2020-05-01',
  rates: { ARS: 73, USD: 2 }
};

exports.getExchangeRatesRespWithError = {
  success: false,
  error: {
    code: 202,
    type: 'invalid_currency_codes',
    info:
      'You have provided one or more invalid Currency Codes. [Required format: currencies=EUR,USD,GBP,...]'
  }
};

exports.properGetCurrenciesResponse = {
  success: true,
  symbols: {
    AED: 'United Arab Emirates Dirham',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
    EUR: 'Euro',
    ARS: 'Argentine Peso',
    USD: 'United States Dollar'
  }
};

exports.getCurrenciesResponseWithError = {
  success: false,
  error: {
    code: 101,
    type: 'invalid_access_key',
    info: 'You have not supplied a valid API Access Key. [Technical Support: support@apilayer.com]'
  }
};

exports.serviceUnavailableResponse = {
  statusCode: 503,
  message: 'Service unavailable'
};
