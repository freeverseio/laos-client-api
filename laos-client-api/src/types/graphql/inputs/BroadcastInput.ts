import { InputType, Field } from "type-graphql";

@InputType()
export class BroadcastInput {

  @Field({ nullable: true })
  type?: BroadcastType;

  @Field({ nullable: false })
  tokenId?: string;

  @Field({ nullable: false })
  chainId?: string;

  @Field({ nullable: false })
  ownershipContractAddress?: string;
}

export enum BroadcastType {
  SELF = 'SELF',
  MINT = 'MINT'
}