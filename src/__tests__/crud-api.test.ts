import { expect } from '@jest/globals';
import supertest from 'supertest';

import { DEFAULT_HEADER, baseURL } from '../utils/constants';

import { server, finishServerWorkForTest } from '..';

const request = supertest(server);

describe('CRUD API', () => {
  afterEach(async () => {
    await finishServerWorkForTest();
  });

  test('Should create user', async () => {
    const user = {
      username: 'Gerald',
      age: 50,
      hobbies: ['kill monsters'],
    };

    const response = await request
      .post(baseURL)
      .set(DEFAULT_HEADER)
      .send({ user })
      .expect(201);

    expect(response.status).toBe(201);
  });

  test('Should delete user', async () => {
    const response = await request.delete(`${baseURL}/1`).set(DEFAULT_HEADER).expect(400);
    
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text).message).toBe('UserId is not valid (not uuid)');   
  });

  test('Should answer with status code 200', async () => {
    const response = await request.get(baseURL);

    expect(response.status).toBe(200);
  });

});
