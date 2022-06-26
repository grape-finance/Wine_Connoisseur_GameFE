import Web3 from "web3";
import { AbiItem } from "web3-utils";

// Addresses
import MultiCallAbi from "abi/multicall.json";
import { MULTICALL_ADDRESS } from "config/address";

const getContract = (abi: any, address: string, web3Provider: string) => {
  const currentWeb3 = new Web3(web3Provider);
  return new currentWeb3.eth.Contract(abi, address);
};

const getMulticallContract = (web3Provider: string, chainId: number) =>
  getContract(
    MultiCallAbi as AbiItem[],
    MULTICALL_ADDRESS[chainId],
    web3Provider
  );
export default getMulticallContract;
