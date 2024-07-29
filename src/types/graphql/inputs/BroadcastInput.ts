import { InputType, Field } from "type-graphql";

@InputType()
export class BroadcastInput {
  @Field({ nullable: false })
  tokenId?: string;

  @Field({ nullable: false })
  chainId?: string;

  @Field({ nullable: false })
  ownershipContractAddress?: string;
}
