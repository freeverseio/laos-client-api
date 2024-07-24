
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { MintResolver } from '../resolvers/MintResolver';

export async function startTestServer() {
  const schema = await buildSchema({
    resolvers: [MintResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen({ port: 0 }); // Use port 0 to get a random available port
  return { server, url };
}
