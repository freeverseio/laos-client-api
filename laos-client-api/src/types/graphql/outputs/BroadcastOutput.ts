import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BroadcastResponse {
  @Field()
  tokenId!: string;

  @Field()
  success!: boolean;
}