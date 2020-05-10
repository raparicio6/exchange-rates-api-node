const request = require('supertest');
const { app } = require('../../../../app');
const {
  mockGetCurrencies,
  mockGetCurrenciesWithError,
  mockGetExchangeRatesWithError,
  mockFixerServiceUnavailable
} = require('../../../testUtils/mocks');

describe('POST /exchange_rates', () => {
  describe('Response with error', () => {
    describe('Base concurrency does not exist', () => {
      let response = null;
      beforeAll(async done => {
        mockGetCurrencies();
        response = await request(app.listener)
          .post('/exchange_rates')
          .send({
            exchangeRate: {
              baseCurrency: 'foo',
              targetCurrency: 'ARS',
              feePercentage: 10
            }
          });
        return done();
      });

      it('status is 400', () => {
        expect(response.status).toBe(400);
      });
      it('error is Bad Request', () => {
        expect(response.body.error).toBe('Bad Request');
      });
      it('message is a string', () => {
        expect(response.body.message).toStrictEqual(expect.any(String));
      });
    });

    describe('Target concurrency does not exist', () => {
      let response = null;
      beforeAll(async done => {
        mockGetCurrencies();
        response = await request(app.listener)
          .post('/exchange_rates')
          .send({
            exchangeRate: {
              baseCurrency: 'USD',
              targetCurrency: 'foo',
              feePercentage: 10
            }
          });
        return done();
      });

      it('status is 400', () => {
        expect(response.status).toBe(400);
      });
      it('error is Bad Request', () => {
        expect(response.body.error).toBe('Bad Request');
      });
      it('message is a string', () => {
        expect(response.body.message).toStrictEqual(expect.any(String));
      });
    });

    describe('Fixer respond with error in get currencies', () => {
      let response = null;
      beforeAll(async done => {
        mockGetCurrenciesWithError();
        response = await request(app.listener)
          .post('/exchange_rates')
          .send({
            exchangeRate: {
              baseCurrency: 'USD',
              targetCurrency: 'ARS',
              feePercentage: 10
            }
          });
        return done();
      });

      it('status is 500', () => {
        expect(response.status).toBe(500);
      });
      it('error is Internal Server Error', () => {
        expect(response.body.error).toBe('Internal Server Error');
      });
      it('message is An internal server error occurred', () => {
        expect(response.body.message).toBe('An internal server error occurred');
      });
    });

    describe('Fixer respond with error in get exchange rates', () => {
      let response = null;
      beforeAll(async done => {
        mockGetCurrencies();
        mockGetExchangeRatesWithError();
        response = await request(app.listener)
          .post('/exchange_rates')
          .send({
            exchangeRate: {
              baseCurrency: 'USD',
              targetCurrency: 'ARS',
              feePercentage: 10
            }
          });
        return done();
      });

      it('status is 500', () => {
        expect(response.status).toBe(500);
      });
      it('error is Internal Server Error', () => {
        expect(response.body.error).toBe('Internal Server Error');
      });
      it('message is An internal server error occurred', () => {
        expect(response.body.message).toBe('An internal server error occurred');
      });
    });

    describe('Fixer unavailable', () => {
      let response = null;
      beforeAll(async done => {
        mockFixerServiceUnavailable();
        response = await request(app.listener)
          .post('/exchange_rates')
          .send({
            exchangeRate: {
              baseCurrency: 'USD',
              targetCurrency: 'ARS',
              feePercentage: 10
            }
          });
        return done();
      });

      it('status is 500', () => {
        expect(response.status).toBe(500);
      });
      it('error is Internal Server Error', () => {
        expect(response.body.error).toBe('Internal Server Error');
      });
      it('message is An internal server error occurred', () => {
        expect(response.body.message).toBe('An internal server error occurred');
      });
    });
  });
});
