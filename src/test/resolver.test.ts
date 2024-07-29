// src/tests/GraphQLAPI.test.ts
import 'reflect-metadata';
import request from 'supertest';
import { startTestServer } from './test-utils';
import { MintingService } from '../services/MintingService';

jest.mock('../services/MintingService');

describe('GraphQL API', () => {
  let url: string;
  let server: any;
  let mockMintingService: MintingService;

  beforeAll(async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockMintingService = new MintingService();
    const testServer = await startTestServer(mockMintingService);
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
        query: '{ status }',
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('Up');
  });

  it('should mint a token successfully', async () => {
    const response = await request(url)
      .post('/graphql')
      .send({
        query: `mutation {
          mint(input: {
            mintTo: "0x1B0b4a597C764400Ea157aB84358c8788A89cd28",
            name: "Example Token",
            description: "This is an example token",
            attributes: "[{\\"trait_type\\":\\"health\\",\\"value\\":\\"10\\"}]",
            image: "https://ipfs.io/ipfs/QmS326uhnQp5PsnznQvHhkzqKLfB7ieWz3onmFXsRvERig"
          }) {
            tokenId
            success
          }
        }`
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.mint.tokenId).toBe('12345');
    expect(response.body.data.mint.success).toBe(true);
  });
});
