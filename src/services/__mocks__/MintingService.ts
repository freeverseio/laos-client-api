import { MintInput } from "../../types/graphql/inputs/MintInput";
import { MintResponse } from "../../types/graphql/outputs/MintOutput";

export const MintingService = jest.fn().mockImplementation(() => {
  return {
    mint: (input: MintInput): Promise<MintResponse> => {
      return Promise.resolve({ tokenId: "12345", success: true });
    }
  };
});
