const { getExchangeRates, getCurrencies } = require('../../app/services/fixer');
const {
  mockGetExchangeRates,
  mockGetExchangeRatesWithError,
  mockGetCurrencies,
  mockGetCurrenciesWithError
} = require('../testUtils/mocks');

describe('Fixer Service GET /latest endpoint', () => {
  describe('Successful response', () => {
    let fixerApiResponse = null;
    const symbols = ['ARS', 'USD'];
    beforeAll(async done => {
      mockGetExchangeRates();
      fixerApiResponse = await getExchangeRates(symbols);
      return done();
    });

    it('response has success property', () => {
      expect(fixerApiResponse).toHaveProperty('success', true);
    });
    it('response has timestamp property', () => {
      expect(fixerApiResponse).toHaveProperty('timestamp', expect.any(Number));
    });
    it('response has base property', () => {
      expect(fixerApiResponse).toHaveProperty('base', 'EUR');
    });
    it('response has date property', () => {
      expect(fixerApiResponse).toHaveProperty('date', expect.any(String));
    });
    it('response has rates property', () => {
      const rates = Object.keys(fixerApiResponse.rates);
      expect(rates).toEqual(symbols);
      const values = Object.values(fixerApiResponse.rates);
      values.forEach(value => expect(value).toStrictEqual(expect.any(Number)));
    });
  });

  describe('Response with error', () => {
    let fixerApiResponse = null;
    beforeAll(async done => {
      mockGetExchangeRatesWithError();
      fixerApiResponse = await getExchangeRates(['foo']);
      return done();
    });

    it('success is false', () => {
      expect(fixerApiResponse).toHaveProperty('success', false);
    });
    it('response has error property', () => {
      expect(fixerApiResponse).toHaveProperty('error', expect.any(Object));
    });
    it('error has info property', () => {
      expect(fixerApiResponse.error).toHaveProperty('info', expect.any(String));
    });
  });
});

describe('Fixer Service GET /symbols endpoint', () => {
  describe('Successful response', () => {
    let fixerApiResponse = null;
    beforeAll(async done => {
      mockGetCurrencies();
      fixerApiResponse = await getCurrencies();
      return done();
    });

    it('response has success property', () => {
      expect(fixerApiResponse).toHaveProperty('success', true);
    });
    it('response has symbols property', () => {
      expect(fixerApiResponse).toHaveProperty('symbols', expect.any(Object));
    });
  });

  describe('Response with error', () => {
    let fixerApiResponse = null;
    beforeAll(async done => {
      mockGetCurrenciesWithError();
      fixerApiResponse = await getCurrencies();
      return done();
    });

    it('success is false', () => {
      expect(fixerApiResponse).toHaveProperty('success', false);
    });
    it('response has error property', () => {
      expect(fixerApiResponse).toHaveProperty('error', expect.any(Object));
    });
    it('error has info property', () => {
      expect(fixerApiResponse.error).toHaveProperty('info', expect.any(String));
    });
  });
});
