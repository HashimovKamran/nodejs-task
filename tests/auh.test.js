const request = require('supertest');
const server = require('../server');

const data = {
    metadata:{
        name: process.env.USERNAME,
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    }
};

describe('POST /api/v1/auth', () => {
    it('should respond with JSON and status code 201', async () => {
      const response = await request(server).post('/api/v1/auth/register').send(data);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message');
    });

    it('should respond with JSON and status code 201', async () => {
        const response = await request(server).post('/api/v1/auth/login').send(data);
  
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message');
    });
});