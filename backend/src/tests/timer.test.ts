import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';
import request from 'supertest';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: '7.0.0',
    },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Timer API', () => {
  it('should create a new timer', async () => {
    const registerRes = await request(app).post('/users/register').send({
      name: 'Test User',
      email: 'timer_test@example.com',
      password: 'password123',
      role: true,
    });

    const token = registerRes.body.token;

    const res = await request(app)
      .post('/timers/submit-reaction-time')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: registerRes.body.user._id,
        time: 150,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('timer');
    expect(res.body.timer).toHaveProperty('time', 150);
  });
});
