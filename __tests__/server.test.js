'use strict';

const { server } = require('../src/server');
const { db } = require('../src/middleware/auth/models/index');
const supertest = require('supertest');

const request = supertest(server);
let authToken;

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Server tests', () => {


  test('Test', async () => {
    let response = await request.get('/test');

    expect(response.status).toEqual(200);
  });

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

    authToken = response.body.token;
  });

  test('Get all users', async () => {
    let response = await request.get('/users');

    expect(response.status).toEqual(200);
  });

  test('Get a single user by id', async () => {
    let response = await request.get('/user/1');

    expect(response.status).toEqual(200);
  });

  test('Update', async () => {
    let response = await request.put('/user/1').send({
      username: 'admin updated',
      password: 'admin',
      role: 'admin',
    }).set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('admin updated');
  });

  test('Create blog post', async () => {
    let response = await request.post('/blog').send({ author: 'josh', content: 'todays blog post' });

    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual('todays blog post');
  });

  test('Get all blogs', async () => {
    let response = await request.get('/blog');

    expect(response.status).toEqual(200);
  });

  test('Get blog by id', async () => {
    let response = await request.get('/blog/1');

    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual('todays blog post');
  });

  test('Update blog post', async () => {
    let response = await request.put('/blog/1').send({
      author: 'Josh',
      content: 'todays blog post updated',
    });

    expect(response.status).toEqual(200);
    expect(response.body.content).toEqual('todays blog post updated');
  });

  test('Delete blog post', async () => {
    let response = await request.delete('/blog/1');

    expect(response.status).toEqual(200);
  });
});