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
    let response = (await request.post('/signup')).send({
      username: 'test',
      password: 'test',
      role: 'admin',
    });

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('test');
  });
});