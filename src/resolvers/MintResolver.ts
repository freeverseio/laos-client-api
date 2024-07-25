// src/resolvers/MintResolver.ts
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { MintingService } from "../services/MintingService";
import { MintInput } from "../types/graphql/inputs/MintInput";
import { MintResponse } from "../types/graphql/outputs/MintOutput";

@Resolver()
export class MintResolver {
  private mintingService: MintingService;

  constructor() {
    this.mintingService = new MintingService();
  }

  @Query(() => String)
  test() {
    return "Hello World!";
  }

  @Mutation(() => MintResponse)
  async mint(@Arg("input") input: MintInput): Promise<MintResponse> {
    return this.mintingService.mint(input);
  }
}
