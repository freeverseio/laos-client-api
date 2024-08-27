import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BatchMintResponse {
  @Field(() => [String], { nullable: false })
  tokenIds!: string[];

  @Field()
  success!: boolean;
}