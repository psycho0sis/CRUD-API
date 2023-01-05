import { expect } from '@jest/globals';
import supertest from 'supertest';

import { deleteDB } from "../utils/delete-db";
import { server } from '..';

const request = supertest(server);

describe('CRUD API', () => {
  test('Should answer with status code 200', async () => {
    const response = await request.get('/api/users');

    expect(response.status).toBe(200);
    await deleteDB();
  });
    
  server.close();
});
