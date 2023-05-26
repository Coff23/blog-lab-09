'use strict';

const { server } = require('../src/server');
const { db } = require('../src/middleware/auth/models/index');
const supertest = require('supertest');

const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Server tests', () => {
  test('Signup', async () => {
    let response = await request.post('/signup').send({
      username: 'admin',
      password: 'admin',
      role: 'admin',
    });

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('admin');
  });

  test('Signin', async () => {
    let response = await request.post('/signin').auth('admin', 'admin');

    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('admin');
  });

  test('Get all users', async () => {
    let response = await request.get('/users');

    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual('admin');
  });
});