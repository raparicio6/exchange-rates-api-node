const ExchangeRate = require('../../app/models/ExchangeRate');
const connectToDatabase = require('../../config/db');
const { exampleExchangeRate } = require('../testUtils/schemas/exchangeRateSchemas');

describe('ExchangeRate', () => {
  describe('create', () => {
    let exchangeRate = null;
    let connection = null;
    beforeAll(async done => {
      connection = await connectToDatabase();
      await ExchangeRate.create(exampleExchangeRate);
      exchangeRate = await ExchangeRate.findOne(exampleExchangeRate);
      return done();
    });
    afterAll(done => connection.connection.db.dropDatabase().then(() => done()));

    it('exchangeRate has baseCurrency property', () => {
      expect(exchangeRate.baseCurrency).toBe('EUR');
    });
    it('exchangeRate has targetCurrency property', () => {
      expect(exchangeRate.targetCurrency).toBe('USD');
    });
    it('exchangeRate has originalValue property', () => {
      expect(exchangeRate.originalValue).toBe(50);
    });
    it('exchangeRate has feePercentage property', () => {
      expect(exchangeRate.feePercentage).toBe(10);
    });
    it('exchangeRate has collectedAt property', () => {
      expect(exchangeRate.collectedAt).toStrictEqual(new Date('2020-05-01'));
    });
    it('exchangeRate has isLastRateOfPair property', () => {
      expect(exchangeRate.isLastRateOfPair).toBe(true);
    });
    it('exchangeRate has feeAmount property', () => {
      expect(exchangeRate.feeAmount).toBe(5);
    });
    it('exchangeRate has valueAfterFeeApplied property', () => {
      expect(exchangeRate.valueAfterFeeApplied).toBe(55);
    });
    it('ExchangeRate collection has one document', async () => {
      const count = await ExchangeRate.countDocuments();
      expect(count).toBe(1);
    });
  });
});
