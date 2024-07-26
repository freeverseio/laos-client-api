import { InputType, Field } from "type-graphql";

@InputType()
export class BroadcastInput {
  @Field({ nullable: true })
  tokenId?: string;
}
