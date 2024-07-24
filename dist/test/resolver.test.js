"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const supertest_1 = __importDefault(require("supertest"));
const test_utils_1 = require("./test-utils");
describe('GraphQL API', () => {
    let url;
    let server;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const testServer = yield (0, test_utils_1.startTestServer)();
        url = testServer.url;
        server = testServer.server;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    it('should return hello world', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(url)
            .post('/graphql')
            .send({
            query: '{ hello }',
        });
        expect(response.status).toBe(200);
        expect(response.body.data.hello).toBe('Hello World!');
    }));
});
