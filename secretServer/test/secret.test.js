const request = require('supertest');
const app = require('../app');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

describe('GET /api/secret/:secret', () => {
  describe('when request a secret from the backend', () => {
    test('should respond with sample message when bad request', async () => {
      const response = await request(app).get('/api/secret/hash');
      expect(response.status).toBe(200)
      expect(response.body.secretText).toBe("Nothing to see here")
    })
    test('should respond with the secret message when have a secret in DB', async () => {
      // if 'optimonk' secret message would be in the DB
      /* const response = await request(app).get('/api/secret/0770545d4585ae14a7c341dfb2f9b952c8f2599d1ce02792617155be724c8ce6109c96a77fc7e9c1a1cd6619cdae62f35e5af13d08248cd3773df44e488ebdb1d80a287306b1e4d05a0c31f7bd83b52bd6bd2bc511c75287a7653207b0fdc8915dfcc597af842468');
      expect(response.body.secretText).toBe('optimonk') */

      // this is just a fake data
      decrypted = cryptr.decrypt('0770545d4585ae14a7c341dfb2f9b952c8f2599d1ce02792617155be724c8ce6109c96a77fc7e9c1a1cd6619cdae62f35e5af13d08248cd3773df44e488ebdb1d80a287306b1e4d05a0c31f7bd83b52bd6bd2bc511c75287a7653207b0fdc8915dfcc597af842468');
      expect(decrypted).toBe("optimonk")
    })
  })
})

describe('GET /api/all-status', () => {
  describe('when request all secret status from the backend', () => {
    // this test succeed if there is no data in the DB
    test('should respond with a 404 status code when there are no secrets', async () => {
      const response = await request(app).get('/api/all-status');
      expect(response.statusCode).toBe(404);
    });
    // this test succeed if there is data in the DB
    test('should respond with a 200 status code when there are secrets', async () => {
      const response = await request(app).get('/api/all-status');
      expect(response.statusCode).toBe(200);
    });
  })
})

/* Need a test database for database tests */

/* describe('POST /api/secret', () => {
  describe('when send a secret to the backend', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app)
        .post('/api/secret')
        .send({
          secret: {
            secret: 'secretMessage',
            expireAfter: 'expireAfter',
            expireAfterViews: 5,
          },
        });
      expect(response.statusCode).toBe(200);
    });

    test('should specify json in the content type header', async () => {
      const response = await request(app)
        .post('/api/secret')
        .send({
          secret: {
            secret: 'secretMessage',
            expireAfter: 'expireAfter',
            expireAfterViews: 5,
          },
        });
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

    test('should have an _id', async () => {
      const response = await request(app)
        .post('/api/secret')
        .send({
          secret: {
            secret: 'secretMessage',
            expireAfter: 'expireAfter',
            expireAfterViews: 5,
          },
        });
      expect(response.body._id).toBeDefined();
    });
  });

  describe('if no secret data found', () => {
    test('should respond with a 404 status code', async () => {
      const response = await request(app).post('/api/secret').send();
      expect(response.statusCode).toBe(404);
    });
  });
}); */


