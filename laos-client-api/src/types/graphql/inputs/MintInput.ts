import { InputType, Field } from "type-graphql";

@InputType()
export class MintInput {
  @Field({ nullable: false })
  laosContractAddress?: string;
  
  @Field({ nullable: false })
  mintTo?: string;

  @Field({ nullable: false })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  attributes?: string;

  @Field({ nullable: true })
  image?: string;
}
