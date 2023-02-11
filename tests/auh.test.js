const request = require('supertest');
const server = require('../server');

const data = {
    metadata:{
        name: "Kamran",
        email: "kamranhashimov90@gmail.com",
        password: "kamranHashimov40"
    }
};

describe('POST /api/v1/auth/register', () => {
    it('should respond with JSON and status code 201', async () => {
      const response = await request(server).post('/api/v1/auth/register').send(data);

      expect(response.statusCode).toBe(201);
      //expect(response.body).toHaveProperty('message');
    });
});