const request = require('supertest');
const { app } = require('../../../../app');

describe('GET /exchange_rates', () => {
  describe('Response with error', () => {
    describe('Invalid collectedAt respond with error', () => {
      let response = null;
      beforeAll(async done => {
        response = await request(app.listener)
          .get('/exchange_rates')
          .query({ collectedAt: 'invalid' });
        return done();
      });

      it('status is 400', () => {
        expect(response.status).toBe(400);
      });
      it('error is Bad Request', () => {
        expect(response.body.error).toBe('Bad Request');
      });
      it('message is Invalid request query input', () => {
        expect(response.body.message).toBe('Invalid request query input');
      });
    });
  });
});
