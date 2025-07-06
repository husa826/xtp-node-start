import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js Test API' });
});

describe('Server Tests', () => {
  it('should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to the Node.js Test API');
  });
}); 