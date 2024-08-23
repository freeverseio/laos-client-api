
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { EvolvingService } from "../services/EvolvingService";
import { EvolveInput } from "../types/graphql/inputs/EvolveInput";
import { EvolveResponse } from "../types/graphql/outputs/EvolveOutput";
interface Context {
  headers: any;
}

@Resolver()
export class EvolveResolver {
  constructor(private evolvingService: EvolvingService) {}

  @Mutation(() => EvolveResponse)
  async evolve(@Arg("input") input: EvolveInput, @Ctx() context: Context): Promise<EvolveResponse> {
    let apiKey = context.headers['api-key'];
    apiKey = apiKey.replace('API-KEY ', '');
    return this.evolvingService.evolve(input, apiKey);
  }
}
