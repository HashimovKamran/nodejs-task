const request = require('supertest');
const server = require('../server');

const data = {
    metadata:{
      limit: process.env.LIMIT
    }
};

describe('POST /api/v1/quotes/list', () => {
    it('should respond with JSON and status code 200', async () => {
      const response = await request(server).post('/api/v1/quotes/list').send(data);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data[0]).toHaveProperty('quote');
      expect(response.body.data[0]).toHaveProperty('author');
      expect(response.body.data[0]).toHaveProperty('category');
    });
});