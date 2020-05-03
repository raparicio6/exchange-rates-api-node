const request = require('supertest');
const { app } = require('../app');
const apiKeyAuth = require('../app/plugins/apiKeyAuth');
const { auth } = require('../config').common;

describe('auth', () => {
  beforeAll(async done => {
    await app.register(apiKeyAuth);
    app.auth.strategy('apiKey', 'apiKey', {
      keyValue: auth.secret,
      keyName: auth.headerName,
      requestSection: 'headers',
      routesToExclude: [{ verb: 'GET', path: '/health' }]
    });
    app.auth.default('apiKey');
    return done();
  });

  describe('api-key is ok respond with success', () => {
    let response = null;
    beforeAll(async done => {
      response = await request(app.listener)
        .get('/currencies')
        .set(auth.headerName, auth.secret);
      return done();
    });

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
  });

  describe('api-key is wrong respond with error', () => {
    let response = null;
    beforeAll(async done => {
      response = await request(app.listener)
        .get('/currencies')
        .set(auth.headerName, 'badkey');
      return done();
    });

    it('status is 401', () => {
      expect(response.status).toBe(401);
    });
    it('error is Unauthorized', () => {
      expect(response.body.error).toBe('Unauthorized');
    });
    it(`message is Missing ${auth.headerName} in headers`, () => {
      expect(response.body.message).toBe(`Missing ${auth.headerName} in headers`);
    });
  });

  describe('no api-key using an exlude route respond with success', () => {
    let response = null;
    beforeAll(async done => {
      response = await request(app.listener).get('/health');
      return done();
    });

    it('status is 200', () => {
      expect(response.status).toBe(200);
    });
  });
});
