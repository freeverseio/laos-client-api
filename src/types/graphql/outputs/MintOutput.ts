import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MintResponse {
  @Field()
  tokenId!: string;

  @Field()
  success!: boolean;
}