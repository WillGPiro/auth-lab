require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  //signs up a user will not include password or password hash as it will have been scrubbed off.
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'will', password: 'willWasHere' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'will',
          __v: 0
        });
      });
  });
  //we cant actual test loging in a user unless we have a user... bring in from model. 
  it('logs in a user', async() => {
    await User.create({ username: 'will', password: 'willWasHere' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'will', password: 'willWasHere' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'will',
          __v: 0
        });
      });
  });


  it('fails to login a user with bad password', async() => {
    await User.create({ username: 'will', password: 'willWasHere' });
    
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'will', password: 'badPassword' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid username/password',
          status: 403
        });
      });
  });
});






