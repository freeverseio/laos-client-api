// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace Service1Types {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Query = {
  token?: Maybe<TokenQueryResult>;
  tokens?: Maybe<TokenConnection>;
  transfers?: Maybe<Array<TransferQueryResult>>;
  tokenHistory?: Maybe<Array<TokenHistoryQueryResult>>;
};


export type QuerytokenArgs = {
  tokenId: Scalars['String']['input'];
  ownershipContractId: Scalars['String']['input'];
};


export type QuerytokensArgs = {
  orderBy?: InputMaybe<TokenOrderByOptions>;
  pagination?: TokenPaginationInput;
  where?: InputMaybe<TokenWhereInput>;
};


export type QuerytransfersArgs = {
  orderBy?: InputMaybe<TransferOrderByOptions>;
  pagination?: InputMaybe<TransferPaginationInput>;
  where?: InputMaybe<TransferWhereInput>;
};


export type QuerytokenHistoryArgs = {
  pagination?: InputMaybe<TokenHistoryPaginationInput>;
  tokenId: Scalars['String']['input'];
  ownershipContractId: Scalars['String']['input'];
};

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type TokenQueryResult = {
  tokenId: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  tokenUri?: Maybe<Scalars['String']['output']>;
  tokenUriFetchState?: Maybe<Scalars['String']['output']>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  initialOwner: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  attributes?: Maybe<Scalars['JSON']['output']>;
  block_number: Scalars['Float']['output'];
};

export type TokenQueryResultSelect = {
  tokenId: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  tokenUri?: Maybe<Scalars['String']['output']>;
  tokenUriFetchState?: Maybe<Scalars['String']['output']>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  initialOwner: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  attributes?: Maybe<Scalars['JSON']['output']>;
  block_number: Scalars['Float']['output'];
  logIndex: Scalars['Float']['output'];
};

export type TokenEdge = {
  cursor: Scalars['String']['output'];
  node: TokenQueryResult;
};

export type TokenConnection = {
  edges: Array<TokenEdge>;
  pageInfo: PageInfo;
};

export type TransferQueryResult = {
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  blockNumber: Scalars['Float']['output'];
  txHash: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  contractAddress?: Maybe<Scalars['String']['output']>;
};

export type TokenHistoryQueryResult = {
  contractAddress?: Maybe<Scalars['String']['output']>;
  tokenUri?: Maybe<Scalars['String']['output']>;
  tokenUriFetchState?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  attributes?: Maybe<Scalars['JSON']['output']>;
  block_number: Scalars['Float']['output'];
  tx_hash: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PaginationInput = {
  limit: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type TransferPaginationInput = {
  limit: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type TokenPaginationInput = {
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
};

export type TokenHistoryPaginationInput = {
  limit: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<TokenHistoryOrderByOptions>;
};

/** Possible options for ordering token histories */
export type TokenHistoryOrderByOptions =
  | 'UPDATED_AT_ASC'
  | 'UPDATED_AT_DESC';

export type TransferWhereInput = {
  tokenId?: InputMaybe<Scalars['String']['input']>;
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
};

export type TokenWhereInput = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
};

/** Possible options for ordering tokens */
export type TokenOrderByOptions =
  | 'CREATED_AT_ASC'
  | 'CREATED_AT_DESC';

/** Possible options for ordering transfers */
export type TransferOrderByOptions =
  | 'TIMESTAMP_ASC'
  | 'TIMESTAMP_DESC'
  | 'BLOCKNUMBER_ASC'
  | 'BLOCKNUMBER_DESC';

  export type QuerySdk = {
      /** null **/
  token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
  /** null **/
  tokenHistory: InContextSdkMethod<Query['tokenHistory'], QuerytokenHistoryArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["Service1"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
