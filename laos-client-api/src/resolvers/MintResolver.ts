import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { MintingService } from "../services/MintingService";
import { MintInput } from "../types/graphql/inputs/MintInput";
import { MintResponse } from "../types/graphql/outputs/MintOutput";

@Resolver()
export class MintResolver {
  constructor(private mintingService: MintingService) {}

  @Query(() => String)
  status() {
    return "Up";
  }

  @Mutation(() => MintResponse)
  async mint(@Arg("input") input: MintInput): Promise<MintResponse> {
    return this.mintingService.mint(input);
  }
}
