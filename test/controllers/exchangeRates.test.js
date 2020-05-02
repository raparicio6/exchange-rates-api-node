const request = require('supertest');
const app = require('../../app');
const ExchangeRate = require('../../app/models/ExchangeRate');
const connectToDatabase = require('../../config/db');
const { manyExchangeRates, getExchangeRatesResponse } = require('../testUtils/schemas/exchangeRateSchemas');

describe('GET /exchange_rates', () => {
  describe('Successful response', () => {
    let connection = null;
    beforeAll(async done => {
      connection = await connectToDatabase();
      await ExchangeRate.create(manyExchangeRates);
      return done();
    });
    afterAll(done => connection.connection.db.dropDatabase().then(() => done()));

    describe('No query params', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener).get('/exchange_rates');
        return done();
      });

      it('status is 200', () => {
        expect(response.status).toBe(200);
      });
      it('response body matchs with expected object', () => {
        expect(response.body).toMatchObject(getExchangeRatesResponse);
      });
    });

    describe('baseCurrencies query param', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener)
          .get('/exchange_rates')
          .query({ baseCurrencies: ['EUR'] });
        return done();
      });

      it('status is 200', () => {
        expect(response.status).toBe(200);
      });
      it('response body matchs with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRates: [
            {
              baseCurrency: 'EUR',
              targetCurrency: 'USD',
              originalValue: 50,
              feePercentage: 10,
              createdAt: '2020-05-01T00:00:00.000Z',
              feeAmount: 5,
              valueWithFeeApplied: 55
            }
          ]
        });
      });
    });

    describe('targetCurrencies query param', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener)
          .get('/exchange_rates')
          .query({ targetCurrencies: ['USD'] });
        return done();
      });

      it('status is 200', () => {
        expect(response.status).toBe(200);
      });
      it('response body matchs with expected object', () => {
        expect(response.body).toMatchObject(getExchangeRatesResponse);
      });
    });

    describe('createdAt query param', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener)
          .get('/exchange_rates')
          .query({ createdAt: '2020-05-02' });
        return done();
      });

      it('status is 200', () => {
        expect(response.status).toBe(200);
      });
      it('response body matchs with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRates: [
            {
              baseCurrency: 'ARS',
              targetCurrency: 'USD',
              originalValue: 20,
              feePercentage: 5,
              createdAt: '2020-05-02T00:00:00.000Z',
              feeAmount: 1,
              valueWithFeeApplied: 21
            }
          ]
        });
      });
    });
  });
});
