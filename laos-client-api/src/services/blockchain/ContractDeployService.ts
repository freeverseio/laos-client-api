// ContractDeployer.ts
import { ethers } from "ethers";
import { DeploymentResult } from "../../types";


export class ContractDeployService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  public async deployContract(
    abi: any,
    bytecode: string,
    constructorArgs: any[]
  ): Promise<DeploymentResult> {
    const factory = new ethers.ContractFactory(abi, bytecode, this.wallet);

    try {
      // Deploy the contract with constructor arguments
      const tx  = await factory.deploy(...constructorArgs);
      if(!tx){
        throw new Error("Failed to deploy contract, tx null.");
      }
      console.log("Transaction sent:", tx);      

      await tx.waitForDeployment();
      const deployTx = tx.deploymentTransaction();
      if (!deployTx) {
          throw new Error("Failed to retrieve deployment transaction, deploymentTransaction is null.");
      }

      const receipt = await deployTx.wait();
      if (!receipt) {
        throw new Error("Failed to retrieve transaction receipt, receipt is null.");
      }
      console.log("receipt:", receipt);
     
      let contractAddress = await  tx.getAddress();

      console.log("Contract deployed at address:", contractAddress);
      return {
        contractAddress,
        transactionHash: deployTx.hash,
      };
    } catch (error) {
      console.error("Error deploying contract:", error);
      throw error;
    }
  }
}
