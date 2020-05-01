const Rate = require('../../app/models/Rate');
const connectToDatabase = require('../../config/db');

const exampleRate = {
  baseCurrency: 'EUR',
  targetCurrency: 'USD',
  originalValue: 50,
  feePercentage: 0.5
};

describe('Rate', () => {
  describe('create', () => {
    let rate = null;
    let connection = null;
    beforeAll(async done => {
      connection = await connectToDatabase();
      await Rate.create(exampleRate);
      rate = await Rate.findOne(exampleRate);
      return done();
    });
    afterAll(done => connection.connection.db.dropDatabase().then(() => done()));

    it('rate has baseCurrency property', () => {
      expect(rate.baseCurrency).toBe('EUR');
    });
    it('rate has targetCurrency property', () => {
      expect(rate.targetCurrency).toBe('USD');
    });
    it('rate has originalValue property', () => {
      expect(rate.originalValue).toBe(50);
    });
    it('rate has feePercentage property', () => {
      expect(rate.feePercentage).toBe(0.5);
    });
    it('Rate collection has one document', async () => {
      const count = await Rate.count();
      expect(count).toBe(1);
    });
  });
});
