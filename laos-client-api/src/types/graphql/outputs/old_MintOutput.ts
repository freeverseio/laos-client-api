import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class OldMintResponse {
  @Field()
  tokenId!: string;

  @Field()
  success!: boolean;
}