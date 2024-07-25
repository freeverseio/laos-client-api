import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { MintInput } from "../inputs/MintInput";

@Resolver()
export class MintResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
  }

  @Mutation(() => String)
  mint(@Arg("input") input: MintInput) {
    const { mintTo, name, description, properties, image } = input;

    if (image?.startsWith("ipfs://")) {
      // Handle IPFS URL
      console.log("IPFS URL provided:", image);
    } else if (image?.startsWith("data:image/")) {
      // Handle base64 encoded image
      console.log("Encoded image provided");
      // You can decode the image here if needed
    } else {
      throw new Error("Invalid image format");
    }

    // Logic to mint with the provided arguments
    console.log("Minting to:", mintTo);
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Properties:", properties);
    console.log("Image:", image);

    return "Minted!";
  }
}
