import 'reflect-metadata';
import request from 'supertest';
import { startTestServer } from './test-utils';

describe('GraphQL API', () => {
  let url: string;
  let server: any;

  beforeAll(async () => {
    const testServer = await startTestServer();
    url = testServer.url;
    server = testServer.server;
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return hello world', async () => {
    const response = await request(url)
      .post('/graphql')
      .send({
        query: '{ hello }',
      });

    expect(response.status).toBe(200);
    expect(response.body.data.hello).toBe('Hello World!');
  });
});
