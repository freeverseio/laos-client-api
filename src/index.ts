import "reflect-metadata";
import * as dotenv from 'dotenv';
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { MintResolver } from "./resolvers/MintResolver";
import { MintingService } from "./services/MintingService"; // Added this import

dotenv.config();

async function startServer() {
  const schema = await buildSchema({
    resolvers: [MintResolver],
    container: {
      get(someClass: any) {
        if (someClass === MintResolver) {
          return new MintResolver(new MintingService());
        }
        return undefined;
      },
    },
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