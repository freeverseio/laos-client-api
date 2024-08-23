import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { BroadcastingService } from "../services/BroadcastingService";
import { BroadcastInput } from "../types/graphql/inputs/BroadcastInput";
import { BroadcastResponse } from "../types/graphql/outputs/BroadcastOutput";

@Resolver()
export class BroadcastResolver {
  constructor(private broadcastService: BroadcastingService) {}

  @Mutation(() => BroadcastResponse)
  async broadcast(@Arg("input") input: BroadcastInput): Promise<BroadcastResponse> {
    return this.broadcastService.broadcast(input);
  }
}
