const request = require('supertest');
const app = require('../../app');
const ExchangeRate = require('../../app/models/ExchangeRate');
const connectToDatabase = require('../../config/db');
const { manyExchangeRates, getExchangeRatesResponse } = require('../testUtils/schemas/exchangeRateSchemas');
const { mockGetExchangeRates } = require('../testUtils/mocks');

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
              collectedAt: '2020-05-01T00:00:00.000Z',
              feeAmount: 5,
              valueAfterFeeApplied: 55
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
      it('response body matchs with expected object', () => {
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
          ]
        });
      });
    });
  });
});

describe('POST /exchange_rates', () => {
  describe('Successful response', () => {
    let connection = null;
    beforeAll(async done => {
      connection = await connectToDatabase();
      return done();
    });
    afterAll(done => connection.connection.db.dropDatabase().then(() => done()));

    describe('EUR as baseCurrency', () => {
      let response = null;
      beforeAll(async done => {
        await ExchangeRate.create({
          baseCurrency: 'EUR',
          targetCurrency: 'ARS',
          originalValue: 50,
          feePercentage: 15,
          collectedAt: '2020-05-01',
          isLastRateOfPair: true
        });
        mockGetExchangeRates();
        response = await request(app.listener)
          .post('/exchange_rates')
          .send({
            exchangeRate: {
              baseCurrency: 'EUR',
              targetCurrency: 'ARS',
              feePercentage: 10
            }
          });
        return done();
      });

      it('status is 201', () => {
        expect(response.status).toBe(201);
      });
      it('response body matchs with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRate: {
            baseCurrency: 'EUR',
            targetCurrency: 'ARS',
            originalValue: 73,
            feePercentage: 10,
            collectedAt: '2020-05-01T00:00:00.000Z',
            feeAmount: 7.3,
            valueAfterFeeApplied: 80.3
          }
        });
      });
      it('exchangeRate is persisted', async () => {
        const createdExchangeRate = await ExchangeRate.findOne({
          baseCurrency: 'EUR',
          targetCurrency: 'ARS',
          isLastRateOfPair: true
        });
        expect(createdExchangeRate).toHaveProperty('baseCurrency', 'EUR');
        expect(createdExchangeRate).toHaveProperty('targetCurrency', 'ARS');
        expect(createdExchangeRate).toHaveProperty('originalValue', 73);
        expect(createdExchangeRate).toHaveProperty('feePercentage', 10);
        expect(createdExchangeRate).toHaveProperty('collectedAt', new Date('2020-05-01'));
        expect(createdExchangeRate).toHaveProperty('feeAmount', 7.3);
        expect(createdExchangeRate).toHaveProperty('valueAfterFeeApplied', 80.3);
        expect(createdExchangeRate).toHaveProperty('isLastRateOfPair', true);
      });
      it('older exchangeRate update isLastRateOfPair to false', async () => {
        const olderExchangeRate = await ExchangeRate.findOne({
          baseCurrency: 'EUR',
          targetCurrency: 'ARS',
          isLastRateOfPair: false
        });
        expect(olderExchangeRate).not.toBeUndefined();
      });
    });

    describe('EUR not as baseCurrency', () => {
      let response = null;
      beforeAll(async done => {
        mockGetExchangeRates();
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

      it('status is 201', () => {
        expect(response.status).toBe(201);
      });
      it('response body matchs with expected object', () => {
        expect(response.body).toMatchObject({
          exchangeRate: {
            baseCurrency: 'USD',
            targetCurrency: 'ARS',
            originalValue: 36.5,
            feePercentage: 10,
            collectedAt: '2020-05-01T00:00:00.000Z',
            feeAmount: 3.65,
            valueAfterFeeApplied: 40.15
          }
        });
      });
    });
  });
});
