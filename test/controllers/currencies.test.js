const request = require('supertest');
const app = require('../../app');
const { mockGetCurrencies, mockGetCurrenciesWithError } = require('../testUtils/mocks');

describe('GET /currencies', () => {
  describe('Successful response', () => {
    let response = null;
    beforeAll(async done => {
      mockGetCurrencies();
      response = await request(app.listener).get('/currencies');
      return done();
    });

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
    it('response body has currencies property', () => {
      expect(response.body).toHaveProperty('currencies', expect.any(Object));
    });
  });

  describe('Fixer respond with error', () => {
    let response = null;
    beforeAll(async done => {
      mockGetCurrenciesWithError();
      response = await request(app.listener).get('/currencies');
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
