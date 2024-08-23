import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject, HttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch';
import { OwnershipContractResponse, OwnershipContract } from '../../types/graphql/outputs/OwnershipContractOutput';

const GET_OWNERSHIP_CONTRACT = gql`
  query MyQuery($id: String!) {
    ownershipContracts(where: { id_eq: $id }) {
      id
      laosContract
    }
  }
`;

export class OwnershipContracService {
  private indexerEthereumClient: ApolloClient<NormalizedCacheObject>;
  private indexerPolygonClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.indexerEthereumClient = new ApolloClient({
      link: new HttpLink({
        uri: process.env.INDEXER_ETHEREUM_ENDPOINT!,
        fetch,
      }),
      cache: new InMemoryCache(),
    });

    this.indexerPolygonClient = new ApolloClient({
      link: new HttpLink({
        uri: process.env.INDEXER_POLYGON_ENDPOINT!,
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }

  private getClient(chainId: number): ApolloClient<NormalizedCacheObject> {
    return chainId === 1 ? this.indexerEthereumClient : this.indexerPolygonClient;
  }

  public async getOwnershipContract(chainId: number, contractAddress: string): Promise<OwnershipContract | null> {
    const client = this.getClient(chainId);
    try {
      const { data } = await client.query<OwnershipContractResponse>({
        query: GET_OWNERSHIP_CONTRACT,
        variables: { id: contractAddress },
      });

      if (data && data.ownershipContracts?.length > 0) {
        return data.ownershipContracts[0];
      } else {
        throw new Error('The contract address is not correct');
      }
    } catch (error) {
      console.error('Error fetching ownership contract:', error);
      throw error;
    }
  }
}
