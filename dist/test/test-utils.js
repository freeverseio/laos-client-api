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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTestServer = startTestServer;
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const MintResolver_1 = require("../resolvers/MintResolver");
function startTestServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [MintResolver_1.MintResolver],
        });
        const server = new apollo_server_1.ApolloServer({ schema });
        const { url } = yield server.listen({ port: 0 }); // Use port 0 to get a random available port
        return { server, url };
    });
}
