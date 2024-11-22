import { InputType, Field } from "type-graphql";
import { IsEnum, IsOptional } from "class-validator";

export enum BroadcastType {
  SELF = 'SELF',
  MINT = 'MINT',
}

@InputType()
export class BroadcastInput {
  @Field({ nullable: true })
  @IsEnum(BroadcastType, { message: "If provided, type must be either 'SELF' or 'MINT'. Default is 'SELF'." })
  @IsOptional()
  type?: BroadcastType;

  @Field({ nullable: false })
  tokenId!: string;

  @Field({ nullable: false })
  chainId!: string;

  @Field({ nullable: false })
  ownershipContractAddress!: string;
}
