import { Resolver, Query } from "type-graphql";

@Resolver()
export class MintResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
  }
}
