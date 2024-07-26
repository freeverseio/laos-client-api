import { InputType, Field } from "type-graphql";

@InputType()
export class MintInput {
  @Field({ nullable: true })
  mintTo?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  attributes?: string;

  @Field({ nullable: true })
  image?: string;
}
