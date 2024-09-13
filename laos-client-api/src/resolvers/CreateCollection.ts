import { Resolver, Query, Mutation, Arg, Ctx  } from "type-graphql";
import { CreateCollectionService } from "../services/CreateCollectionService";
import { CreateCollectionInput } from "../types/graphql/inputs/CreateCollectionInput";
import { CreateCollectionResponse } from "../types/graphql/outputs/CreateCollectionOutput";

interface Context {
  headers: any;
}
@Resolver()
export class CreateCollectionResolver {
  constructor(private createCollectionService: CreateCollectionService) {}

  // @Query(() => String)
  // status() {
  //   return "Up";
  // }

  @Mutation(() => CreateCollectionResponse)
  async createCollection(@Arg("input") input: CreateCollectionInput, @Ctx() context: Context): Promise<CreateCollectionResponse> {
    let apiKey = context.headers['authorization'];
    //remove the API-KEY prefix
    apiKey = apiKey.replace('API-KEY ', '');
    return this.createCollectionService.createCollection(input, apiKey);
  }
}
