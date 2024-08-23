// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace Service2Types {
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
};

export type Mutation = {
  mint: MintResponse;
  evolve: EvolveResponse;
  broadcast: BroadcastResponse;
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

export type MintResponse = {
  tokenId: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type MintInput = {
  laosContractAddress: Scalars['String']['input'];
  mintTo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  attributes?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
};

export type EvolveResponse = {
  tokenId: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  tokenUri: Scalars['String']['output'];
  tx: Scalars['String']['output'];
};

export type EvolveInput = {
  laosContractAddress: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  attributes?: InputMaybe<Scalars['String']['input']>;
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

  export type QuerySdk = {
      /** null **/
  status: InContextSdkMethod<Query['status'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** null **/
  mint: InContextSdkMethod<Mutation['mint'], MutationmintArgs, MeshContext>,
  /** null **/
  evolve: InContextSdkMethod<Mutation['evolve'], MutationevolveArgs, MeshContext>,
  /** null **/
  broadcast: InContextSdkMethod<Mutation['broadcast'], MutationbroadcastArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["Service2"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}