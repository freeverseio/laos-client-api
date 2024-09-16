import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCollectionInput {
  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  chainId!: string;

}