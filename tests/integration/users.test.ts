import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { app, init } from 'server';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /signup', () => {
  it('should respond with status 422 when body is not given', async () => {
    const response = await server.post('/signup');

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should respond with status 422 when body is not valid', async () => {
    const invalidBody = { 
      email: faker.lorem.word(),
      username: faker.lorem.word(),
      password: faker.lorem.word(), 
      confirmPassword: faker.lorem.text()
    };

    const response = await server.post('/signup').send(invalidBody);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
