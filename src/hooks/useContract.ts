import { Contract } from "@ethersproject/contracts";
import {
  GRAPE_ADDRESS,
  VINTAGEWINE_ADDRESS,
  CELLAR_ADDRESS,
  UPGRADE_ADDRESS,
  VINTNER_ADDRESS,
  WINERYPROGRESSION_ADDRESS,
  WINERY_ADDRESS,
  MULTICALL_ADDRESS,
  VINTAGEWINE_FOUNTAIN_ADDRESS,
  USDC_VINTAGEWINE_LP_ADDRESS,
} from "config/address";
import { useMemo } from "react";
import { useWeb3 } from "state/web3";
import { getContract } from "utils";
import GRAPE_TOKEN_ABI from "abi/grape.json";
import VINTAGEWINE_TOKEN_ABI from "abi/vintageWine.json";
import USDC_VINTAGEWINE_LP_ABI from "abi/USDCVintageWineLP.json";
import CELLAR_ABI from "abi/cellar.json";
import UPGRADE_ABI from "abi/upgrade.json";
import VINTNER_ABI from "abi/vintner.json";
import WINERY_ABI from "abi/winery.json";
import WINERYPROGRESSION_ABI from "abi/wineryProgression.json";
import VINTAGEWINE_FOUNTAIN_ABI from "abi/vintageWineFountain.json";
import MULTICALL_ABI from "abi/multicall.json";
// import { getProvider } from "utils/provider";

export function useContract(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: { [chainId: number]: any } | any,
  withSignerIfPossible = true
): Contract | null {
  const { chainId, provider, account } = useWeb3();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    let abi: any;
    if (!Array.isArray(ABI) && Object.keys(ABI).length > 0) abi = ABI[chainId];
    else abi = ABI;
    if (!abi) return null;
    try {
      return getContract(
        address,
        abi,
        provider,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    provider,
    chainId,
    withSignerIfPossible,
    account,
  ]);
}

export function useMulticall2Contract() {
  return useContract(MULTICALL_ADDRESS, MULTICALL_ABI, false);
}

export function useGrapeContract() {
  return useContract(GRAPE_ADDRESS, GRAPE_TOKEN_ABI);
}

export function useVintageWineContract() {
  return useContract(VINTAGEWINE_ADDRESS, VINTAGEWINE_TOKEN_ABI);
}

export function useUSDCVintageWineLPContract() {
  return useContract(USDC_VINTAGEWINE_LP_ADDRESS, USDC_VINTAGEWINE_LP_ABI);
}

export function useCellarContract() {
  return useContract(CELLAR_ADDRESS, CELLAR_ABI);
}

export function useUpgradeContract() {
  return useContract(UPGRADE_ADDRESS, UPGRADE_ABI);
}

export function useVintnerContract() {
  return useContract(VINTNER_ADDRESS, VINTNER_ABI);
}

export function useWineryContract() {
  return useContract(WINERY_ADDRESS, WINERY_ABI);
}

export function useWineryProgressionContract() {
  return useContract(WINERYPROGRESSION_ADDRESS, WINERYPROGRESSION_ABI);
}

export function useVintageWineFountainContract() {
  return useContract(VINTAGEWINE_FOUNTAIN_ADDRESS, VINTAGEWINE_FOUNTAIN_ABI);
}

// export function usePizzeriaContract() {
//   return useMemo(() => {
//     const address = "0x28a6204E03c43BD4580c3664f7F0B4d862004C96";
//     const abi = PIZZERIA_ABI;
//     const provider = getProvider(43114);
//     try {
//       return getContract(address, abi, provider);
//     } catch (error) {
//       console.error("Failed to get contract", error);
//       return null;
//     }
//   }, []);
// }
