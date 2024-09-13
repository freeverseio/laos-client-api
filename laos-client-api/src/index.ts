import "reflect-metadata";
import * as dotenv from 'dotenv';
import cron from 'node-cron';
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { MintResolver } from "./resolvers/MintResolver";
import { MintingService } from "./services/MintingService"; 
import { EvolveResolver } from "./resolvers/EvolveResolver";
import { EvolvingService } from "./services/EvolvingService";
import { BroadcastResolver } from "./resolvers/BroadcastResolver";
import { BroadcastingService } from "./services/BroadcastingService";
import { IPFSService } from "./services/ipfs/IPFSService";

dotenv.config();

async function startServer() {
  const ipfsService = new IPFSService(process.env.PINATA_API_KEY!, process.env.PINATA_API_SECRET!);
  const schema = await buildSchema({
    resolvers: [MintResolver, EvolveResolver, BroadcastResolver],
    container: {
      get(someClass: any) {
        if (someClass === BroadcastResolver) {
          return new BroadcastResolver(new BroadcastingService());
        }
        if (someClass === MintResolver) {
          return new MintResolver(new MintingService());
        }
        if (someClass === EvolveResolver) {
          return new EvolveResolver(new EvolvingService());
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

    cron.schedule('*/5 * * * *', () => {
      console.log('Running periodic job every 5 minutes');
      ipfsService.retryFailedIpfsUploads();
    });
  });
}

startServer();