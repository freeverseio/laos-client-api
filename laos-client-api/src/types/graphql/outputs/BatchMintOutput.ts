import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class BatchMintResponse {
  @Field(() => Int, { nullable: false })
  numberOfTokens!: number;

  @Field(() => [String], { nullable: false })
  tokenIds!: string[];

  @Field()
  success!: boolean;
}