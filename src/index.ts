import "reflect-metadata";
import * as dotenv from 'dotenv';
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { MintResolver } from "./resolvers/MintResolver";

dotenv.config();

async function startServer() {
  const schema = await buildSchema({
    resolvers: [MintResolver],
  });

  const server = new ApolloServer({
    schema,
    introspection: true, // Enables introspection of the schema
    plugins: [
    ],
  });

  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startServer();
