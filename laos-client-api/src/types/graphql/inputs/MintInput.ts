import { InputType, Field } from "type-graphql";

@InputType()
class TokenInput {
  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  attributes?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => [String], { nullable: false })
  mintTo!: string[];
}

@InputType()
export class MintInput {
  @Field({ nullable: false })
  chainId!: string;

  @Field({ nullable: false })
  contractAddress!: string;

  @Field(() => [TokenInput], { nullable: false })
  tokens!: TokenInput[];
}