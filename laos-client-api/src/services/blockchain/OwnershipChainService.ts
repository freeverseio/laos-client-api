import { ethers } from "ethers";
import { BroadcastResult, OwnershipChainConfig, BroadcastParams } from "../../types";
import ERC721UniversalAbi from '../../abi/contracts/ERC721Universal.json';
import { ERC721UniversalBytecode }from '../../abi/contracts/ERC721UniversalBytecode';

export class OwnershipChainService {
  private minterPvk: string = '';

  constructor(config: OwnershipChainConfig) {
    const { minterPvk} = config;
    if (!minterPvk) {
      throw new Error('Private key not found in environment variables');
    }
    this.minterPvk = minterPvk;
  }

  public async broadcast(params: BroadcastParams): Promise<BroadcastResult> {
    let tx: any;

    const rpcOwnershipChain = this.getChainRpcbyChainId(params.chainId);
    const ownershipChainContract = params.ownershipContractAddress;
    const provider = new ethers.JsonRpcProvider(rpcOwnershipChain);
    const wallet = new ethers.Wallet(this.minterPvk, provider);
    const contract = new ethers.Contract(ownershipChainContract, ERC721UniversalAbi, wallet);

    const nonce = await wallet.getNonce();

    try {     
      console.log("Broadcasting tokenId:", params.tokenId);
      tx = await contract
        .broadcastSelfTransfer(params.tokenId, { nonce, gasLimit: 1000000 })
        .catch((error: Error) => {
          console.error(
            "broadcastSelfTransfer Failed, nonce:",
            nonce,
            "error: ",
            error.message
          );
          throw error;
        });

      const receipt = await this.retryOperation(
        () => provider.waitForTransaction(tx.hash, 1, 14000),
        20
      );

      return {
        status: "success",
        tokenId: params.tokenId,
        tx: tx?.hash,
      };
    } catch (error: any) {
      console.error("BroadcastSelfTransfer Failed:", error.message);
      return {
        status: "failed",
        tx: tx?.hash,
        error: error.message,
      };
    }
  }

  private async retryOperation(operation: () => Promise<any>, maxRetries: number): Promise<any> {
    try {
      return await operation();
    } catch (error: any) {
      if (maxRetries <= 1) {
        console.error("Transaction Confirmation Failed:", error.message);
        throw error;
      } else {
        return this.retryOperation(operation, maxRetries - 1);
      }
    }
  }

  private getChainRpcbyChainId(chainId: string): string {
    // TOOD envVar
    const chains = [
        { chainId: "1", rpcUrl: "https://ethereum-rpc.publicnode.com" },
        { chainId: "137", rpcUrl: "https://polygon-rpc.com/" },
    ];

    const chain = chains.find(c => c.chainId === chainId);
    if (chain) {
      return chain.rpcUrl;
    } else {
      console.error('Chain ID not supported:', chainId);
      throw new Error("Chain ID not supported");
    }
  }

  public async deployNewErc721universal(ownerAddress: string, chainId: string, name: string, symbol: string, baseURI: string): Promise<any> {
    const rpcOwnershipChain = this.getChainRpcbyChainId(chainId);
    const provider = new ethers.JsonRpcProvider(rpcOwnershipChain);
    const wallet = new ethers.Wallet(this.minterPvk, provider);
    const factory = new ethers.ContractFactory(ERC721UniversalAbi, ERC721UniversalBytecode, wallet);

    try {
      // Deploy the contract with constructor arguments
      const tx  = await factory.deploy(ownerAddress, contractName, contractSymbol, baseURI);
      if(!tx){
        throw new Error("Failed to deploy contract, tx null.");
      }
      console.log("Transaction sent:", tx);      

      // Wait for the transaction to be mined      
      //const receipt = await tx.deploymentTransaction().wait();

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

      let contractAddress = '';
      const eventInterface = new ethers.Interface(ERC721UniversalAbi);      
      receipt.logs.forEach((log) => {
          try {
              const parsedLog = eventInterface.parseLog(log);
              if (parsedLog && parsedLog.args && parsedLog.args[0]) {
                  console.log(parsedLog.args[0]);
                  if (parsedLog.name === "NewERC721Universal") {
                      contractAddress = parsedLog.args[0];
                  }
              }

          } catch (error) {
              // If decoding fails, skip this log
              console.log(error);
          }
      });

      console.log("Contract deployed at address:", contractAddress);

      return contractAddress;
    } catch (error) {
      console.error("Error deploying contract:", error);
    }    
  }

}