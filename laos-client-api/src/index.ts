import "reflect-metadata";
import * as dotenv from 'dotenv';
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { MintResolver } from "./resolvers/MintResolver";
import { MintingService } from "./services/MintingService"; 
import { EvolveResolver } from "./resolvers/EvolveResolver";
import { EvolvingService } from "./services/EvolvingService";
import { BroadcastResolver } from "./resolvers/BroadcastResolver";
import { BroadcastingService } from "./services/BroadcastingService";
import { CreateCollectionResolver } from "./resolvers/CreateCollection";
import { CreateCollectionService } from "./services/CreateCollectionService";

dotenv.config();

async function startServer() {
  const schema = await buildSchema({
    resolvers: [MintResolver, EvolveResolver, BroadcastResolver, CreateCollectionResolver],
    container: {
      get(someClass: any) {
        if (someClass === BroadcastResolver) {
          return new BroadcastResolver(new BroadcastingService());
        } else if (someClass === MintResolver) {
          return new MintResolver(new MintingService());
        } else if (someClass === EvolveResolver) {
          return new EvolveResolver(new EvolvingService());
        } else if (someClass === CreateCollectionResolver) {
          return new CreateCollectionResolver(new CreateCollectionService());
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
    context: ({ req }) => {
      return {
        headers: req.headers,
      };
    },
  });

  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startServer();