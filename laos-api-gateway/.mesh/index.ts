// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { Service2Types } from './sources/Service2/types';
import type { Service1Types } from './sources/Service1/types';
import * as importedModule$0 from "./../src/authPlugin.js";
import * as importedModule$1 from "./sources/Service2/introspectionSchema";
import * as importedModule$2 from "./sources/Service1/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  status: Scalars['String']['output'];
};


export type QuerytokenArgs = {
  tokenId: Scalars['String']['input'];
  contractAddress: Scalars['String']['input'];
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
  contractAddress: Scalars['String']['input'];
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  TokenQueryResult: ResolverTypeWrapper<TokenQueryResult>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  TokenQueryResultSelect: ResolverTypeWrapper<TokenQueryResultSelect>;
  TokenEdge: ResolverTypeWrapper<TokenEdge>;
  TokenConnection: ResolverTypeWrapper<TokenConnection>;
  TransferQueryResult: ResolverTypeWrapper<TransferQueryResult>;
  TokenHistoryQueryResult: ResolverTypeWrapper<TokenHistoryQueryResult>;
  PaginationInput: PaginationInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  TransferPaginationInput: TransferPaginationInput;
  TokenPaginationInput: TokenPaginationInput;
  TokenHistoryPaginationInput: TokenHistoryPaginationInput;
  TokenHistoryOrderByOptions: TokenHistoryOrderByOptions;
  TransferWhereInput: TransferWhereInput;
  TokenWhereInput: TokenWhereInput;
  TokenOrderByOptions: TokenOrderByOptions;
  TransferOrderByOptions: TransferOrderByOptions;
  Mutation: ResolverTypeWrapper<{}>;
  MintResponse: ResolverTypeWrapper<MintResponse>;
  MintInput: MintInput;
  EvolveResponse: ResolverTypeWrapper<EvolveResponse>;
  EvolveInput: EvolveInput;
  BroadcastResponse: ResolverTypeWrapper<BroadcastResponse>;
  BroadcastInput: BroadcastInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String']['output'];
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean']['output'];
  TokenQueryResult: TokenQueryResult;
  Float: Scalars['Float']['output'];
  DateTime: Scalars['DateTime']['output'];
  JSON: Scalars['JSON']['output'];
  TokenQueryResultSelect: TokenQueryResultSelect;
  TokenEdge: TokenEdge;
  TokenConnection: TokenConnection;
  TransferQueryResult: TransferQueryResult;
  TokenHistoryQueryResult: TokenHistoryQueryResult;
  PaginationInput: PaginationInput;
  Int: Scalars['Int']['output'];
  TransferPaginationInput: TransferPaginationInput;
  TokenPaginationInput: TokenPaginationInput;
  TokenHistoryPaginationInput: TokenHistoryPaginationInput;
  TransferWhereInput: TransferWhereInput;
  TokenWhereInput: TokenWhereInput;
  Mutation: {};
  MintResponse: MintResponse;
  MintInput: MintInput;
  EvolveResponse: EvolveResponse;
  EvolveInput: EvolveInput;
  BroadcastResponse: BroadcastResponse;
  BroadcastInput: BroadcastInput;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['TokenQueryResult']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'tokenId' | 'contractAddress'>>;
  tokens?: Resolver<Maybe<ResolversTypes['TokenConnection']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'pagination'>>;
  transfers?: Resolver<Maybe<Array<ResolversTypes['TransferQueryResult']>>, ParentType, ContextType, Partial<QuerytransfersArgs>>;
  tokenHistory?: Resolver<Maybe<Array<ResolversTypes['TokenHistoryQueryResult']>>, ParentType, ContextType, RequireFields<QuerytokenHistoryArgs, 'tokenId' | 'contractAddress'>>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenQueryResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenQueryResult'] = ResolversParentTypes['TokenQueryResult']> = ResolversObject<{
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenUriFetchState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  initialOwner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  block_number?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type TokenQueryResultSelectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenQueryResultSelect'] = ResolversParentTypes['TokenQueryResultSelect']> = ResolversObject<{
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenUriFetchState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  initialOwner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  block_number?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  logIndex?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenEdgeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenEdge'] = ResolversParentTypes['TokenEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TokenQueryResult'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenConnectionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenConnection'] = ResolversParentTypes['TokenConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['TokenEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferQueryResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TransferQueryResult'] = ResolversParentTypes['TransferQueryResult']> = ResolversObject<{
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenHistoryQueryResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenHistoryQueryResult'] = ResolversParentTypes['TokenHistoryQueryResult']> = ResolversObject<{
  contractAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenUriFetchState?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  block_number?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tx_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  mint?: Resolver<ResolversTypes['MintResponse'], ParentType, ContextType, RequireFields<MutationmintArgs, 'input'>>;
  evolve?: Resolver<ResolversTypes['EvolveResponse'], ParentType, ContextType, RequireFields<MutationevolveArgs, 'input'>>;
  broadcast?: Resolver<ResolversTypes['BroadcastResponse'], ParentType, ContextType, RequireFields<MutationbroadcastArgs, 'input'>>;
}>;

export type MintResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MintResponse'] = ResolversParentTypes['MintResponse']> = ResolversObject<{
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EvolveResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EvolveResponse'] = ResolversParentTypes['EvolveResponse']> = ResolversObject<{
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tokenUri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tx?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BroadcastResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BroadcastResponse'] = ResolversParentTypes['BroadcastResponse']> = ResolversObject<{
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  TokenQueryResult?: TokenQueryResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  TokenQueryResultSelect?: TokenQueryResultSelectResolvers<ContextType>;
  TokenEdge?: TokenEdgeResolvers<ContextType>;
  TokenConnection?: TokenConnectionResolvers<ContextType>;
  TransferQueryResult?: TransferQueryResultResolvers<ContextType>;
  TokenHistoryQueryResult?: TokenHistoryQueryResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MintResponse?: MintResponseResolvers<ContextType>;
  EvolveResponse?: EvolveResponseResolvers<ContextType>;
  BroadcastResponse?: BroadcastResponseResolvers<ContextType>;
}>;


export type MeshContext = Service1Types.Context & Service2Types.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case "src/authPlugin.ts":
      return Promise.resolve(importedModule$0) as T;
    
    case ".mesh/sources/Service2/introspectionSchema":
      return Promise.resolve(importedModule$1) as T;
    
    case ".mesh/sources/Service1/introspectionSchema":
      return Promise.resolve(importedModule$2) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("🕸️  Mesh");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const service1Transforms = [];
const service2Transforms = [];
const additionalTypeDefs = [] as any[];
const service1Handler = new GraphqlHandler({
              name: "Service1",
              config: {"endpoint":"https://indexer.gorengine.com/graphql"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Service1"),
              logger: logger.child("Service1"),
              importFn,
            });
const service2Handler = new GraphqlHandler({
              name: "Service2",
              config: {"endpoint":"https://api.laos.gorengine.com/"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Service2"),
              logger: logger.child("Service2"),
              importFn,
            });
sources[0] = {
          name: 'Service1',
          handler: service1Handler,
          transforms: service1Transforms
        }
sources[1] = {
          name: 'Service2',
          handler: service2Handler,
          transforms: service2Transforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })
const importedAdditionalEnvelopPlugins = await import("../src/authPlugin.ts").then(m => m.default || m);
additionalEnvelopPlugins.push(importedAdditionalEnvelopPlugins)

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));