import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CreateCollectionResponse {  
  @Field()
  name!: string;

  @Field()
  chainId!: string;

  @Field()
  contractAddress!: string;

  @Field()
  laosAddress!: string;

  @Field()
  batchMinterAddress!: string;

  @Field()
  success!: boolean;
}