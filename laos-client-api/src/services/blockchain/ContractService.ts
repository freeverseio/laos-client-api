// ContractDeployer.ts
import { ethers } from "ethers";
import { DeploymentResult } from "../../types";

export const laosTransactionOverrides = {
  gasPrice:5000000000n,
  gas: 10000000n
};

export class ContractService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor(privateKey: string, rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  public async deployContract(
    abi: any,
    bytecode: string,
    constructorArgs: any[],
    transactionOverrides: any | undefined,
  ): Promise<DeploymentResult> {
    const factory = new ethers.ContractFactory(abi, bytecode, this.wallet);

    try {
      // Deploy the contract with constructor arguments      
      let contract;
      if(transactionOverrides){
        contract  = await factory.deploy(...constructorArgs, transactionOverrides);
      }else{
        contract  = await factory.deploy(...constructorArgs);        
      }
      if(!contract){
        throw new Error("Failed to deploy contract, tx null.");
      }
   
      await contract.waitForDeployment();
      const deployTx = contract.deploymentTransaction();
      if (!deployTx) {
          throw new Error("Failed to retrieve deployment transaction, deploymentTransaction is null.");
      }

      const receipt = await deployTx.wait();
      if (!receipt) {
        throw new Error("Failed to retrieve transaction receipt, receipt is null.");
      }
      let contractAddress = await  contract.getAddress();
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

  public async transferOwnership(
    contractAddress: string,
    abi: any,
    newOwnerAddress: string
  ): Promise<ethers.TransactionReceipt> {
    const contract = new ethers.Contract(contractAddress, abi, this.wallet);
  
    try {
      const tx = await contract.transferOwnership(newOwnerAddress, laosTransactionOverrides);
      console.log(`Ownership transfer transaction sent: ${tx.hash}`);
  
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log(`Ownership transferred to ${newOwnerAddress}`);
  
      return receipt;
    } catch (error) {
      console.error("Error transferring ownership:", error);
      throw error;
    }
  }

}  
