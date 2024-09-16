// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ApiClientTypes {
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
};

export type Query = {
  status: Scalars['String']['output'];
  refresh: Scalars['String']['output'];
};

export type Mutation = {
  mint: MintResponse;
  evolve: EvolveResponse;
  broadcast: BroadcastResponse;
  createCollection: CreateCollectionResponse;
};


export type MutationmintArgs = {
  input: MintInput;
};


export type MutationevolveArgs = {
  input: EvolveInput;
};


export type MutationbroadcastArgs = {
  input: BroadcastInput;
};


export type MutationcreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MintResponse = {
  numberOfTokens: Scalars['Int']['output'];
  tokenIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MintInput = {
  chainId: Scalars['String']['input'];
  contractAddress: Scalars['String']['input'];
  tokens: Array<TokenInput>;
};

export type TokenInput = {
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  attributes?: InputMaybe<Array<AttributeInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  mintTo: Array<Scalars['String']['input']>;
};

export type AttributeInput = {
  trait_type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type EvolveResponse = {
  tokenId: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  tokenUri: Scalars['String']['output'];
  tx: Scalars['String']['output'];
};

export type EvolveInput = {
  chainId: Scalars['String']['input'];
  contractAddress: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  attributes?: InputMaybe<Array<AttributeInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
};

export type BroadcastResponse = {
  tokenId: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BroadcastInput = {
  tokenId: Scalars['String']['input'];
  chainId: Scalars['String']['input'];
  ownershipContractAddress: Scalars['String']['input'];
};

export type CreateCollectionResponse = {
  chainId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  contractAddress: Scalars['String']['output'];
  laosAddress: Scalars['String']['output'];
  batchMinterAddress: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateCollectionInput = {
  chainId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
};

  export type QuerySdk = {
      /** null **/
  status: InContextSdkMethod<Query['status'], {}, MeshContext>,
  /** null **/
  refresh: InContextSdkMethod<Query['refresh'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** null **/
  mint: InContextSdkMethod<Mutation['mint'], MutationmintArgs, MeshContext>,
  /** null **/
  evolve: InContextSdkMethod<Mutation['evolve'], MutationevolveArgs, MeshContext>,
  /** null **/
  broadcast: InContextSdkMethod<Mutation['broadcast'], MutationbroadcastArgs, MeshContext>,
  /** null **/
  createCollection: InContextSdkMethod<Mutation['createCollection'], MutationcreateCollectionArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["api-client"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
