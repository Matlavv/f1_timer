import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  let token: string;

  it('should register a new user', async () => {
    const response = await request(app).post('/users/register').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'secure_password',
      role: true,
    });

    console.log('Response:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should login an existing user', async () => {
    const response = await request(app).post('/users/login').send({
      email: 'john.doe@example.com',
      password: 'secure_password',
    });

    console.log('Response:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });
});
