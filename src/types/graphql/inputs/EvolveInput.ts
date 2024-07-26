import { InputType, Field } from "type-graphql";

@InputType()
export class EvolveInput {
  @Field({ nullable: true })
  tokenId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  properties?: string;

  @Field({ nullable: true })
  image?: string;
}
