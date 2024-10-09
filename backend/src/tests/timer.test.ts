import request from 'supertest';
import app from '../app';

describe('Timer API', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const registerResponse = await request(app).post('/users/register').send({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'secure_password',
      role: true,
    });

    console.log('Register Response:', registerResponse.body);

    token = registerResponse.body.token;
    userId = registerResponse.body.user?._id;
  });

  it('should create a new timer', async () => {
    const response = await request(app)
      .post('/timers/submit-reaction-time')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: userId,
        time: 123,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user_id', userId);
    expect(response.body).toHaveProperty('time', 123);
  });

  it('should get all timers for a user', async () => {
    const response = await request(app)
      .get(`/timers/get-reaction-times/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get all timers for a user with sort and filter', async () => {
    const response = await request(app)
      .get(
        `/timers/get-reaction-times/${userId}?sort=asc&minTime=100&maxTime=200`,
      )
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
