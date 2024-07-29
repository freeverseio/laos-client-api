
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { EvolvingService } from "../services/EvolvingService";
import { EvolveInput } from "../types/graphql/inputs/EvolveInput";
import { EvolveResponse } from "../types/graphql/outputs/EvolveOutput";

@Resolver()
export class EvolveResolver {
  constructor(private evolvingService: EvolvingService) {}

  @Mutation(() => EvolveResponse)
  async evolve(@Arg("input") input: EvolveInput): Promise<EvolveResponse> {
    return this.evolvingService.evolve(input);
  }
}
