const request = require('supertest');
const { app } = require('../../../../app');
const ExchangeRate = require('../../../../app/models/ExchangeRate');
const connectToDatabase = require('../../../../config/db');
const {
  manyExchangeRates,
  getExchangeRatesResponse
} = require('../../../testUtils/schemas/exchangeRateSchemas');

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
      it('response body matches with expected object', () => {
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
      it('response body matches with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRates: [
            {
              baseCurrency: 'EUR',
              targetCurrency: 'USD',
              originalValue: 50,
              feePercentage: 10,
              collectedAt: '2020-05-01T00:00:00.000Z',
              feeAmount: 5,
              valueAfterFeeApplied: 55
            }
          ],
          limit: 10,
          page: 1,
          prevPage: null,
          nextPage: null,
          totalPages: 1,
          totalExchangeRates: 1
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
      it('response body matches with expected object', () => {
        expect(response.body).toMatchObject(getExchangeRatesResponse);
      });
    });

    describe('collectedAt query param', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener)
          .get('/exchange_rates')
          .query({ collectedAt: '2020-05-02' });
        return done();
      });

      it('status is 200', () => {
        expect(response.status).toBe(200);
      });
      it('response body matches with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRates: [
            {
              baseCurrency: 'ARS',
              targetCurrency: 'USD',
              originalValue: 20,
              feePercentage: 5,
              collectedAt: '2020-05-02T00:00:00.000Z',
              feeAmount: 1,
              valueAfterFeeApplied: 21
            }
          ],
          limit: 10,
          page: 1,
          prevPage: null,
          nextPage: null,
          totalPages: 1,
          totalExchangeRates: 1
        });
      });
    });

    describe('page and limit query params', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener)
          .get('/exchange_rates')
          .query({ limit: 1, page: 2 });
        return done();
      });

      it('status is 200', () => {
        expect(response.status).toBe(200);
      });
      it('response body matches with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRates: [
            {
              baseCurrency: 'ARS',
              targetCurrency: 'USD',
              originalValue: 20,
              feePercentage: 5,
              collectedAt: '2020-05-02T00:00:00.000Z',
              feeAmount: 1,
              valueAfterFeeApplied: 21
            }
          ],
          limit: 1,
          page: 2,
          prevPage: 1,
          nextPage: null,
          totalPages: 2,
          totalExchangeRates: 2
        });
      });
    });
  });
});
