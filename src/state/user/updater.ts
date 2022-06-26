import { setUserTokenBalance, setLoading, setNFTInfo } from "./actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGrapeContract,
  useUpgradeContract,
  useVintageWineContract,
  useVintnerContract,
  useWineryContract,
} from "hooks/useContract";

import { useWeb3 } from "state/web3";
import { SupportedChainId } from "config/address";

export default function Updater(): null {
  const dispatch = useDispatch();

  const { account, chainId } = useWeb3();
  const grapeTokenContract = useGrapeContract();
  const vintageWineTokenContract = useVintageWineContract();
  const vintnerContract = useVintnerContract();
  const upgradeContract = useUpgradeContract();
  const wineryContract = useWineryContract();

  useEffect(() => {
    // Get user token balance of Grape and VintageWine
    if (
      account &&
      grapeTokenContract &&
      vintageWineTokenContract &&
      vintnerContract &&
      upgradeContract &&
      wineryContract &&
      (chainId === SupportedChainId.MAINNET ||
        chainId === SupportedChainId.TESTNET)
    ) {
      const getBalance = async () => {
        // dispatch(
        //   setLoading({
        //     isLoading: true,
        //   })
        // );

        // get User Info
        const grapeTokenBalance = await grapeTokenContract.balanceOf(account);
        const vintageWineTokenBalance =
          await vintageWineTokenContract.balanceOf(account);
        const vintnerBalance = await vintnerContract.balanceOf(account);
        const upgradeBalance = await upgradeContract.balanceOf(account);
        const vintnerStakedBalance =
          await wineryContract.ownedVintnerStakesBalance(account);
        const upgradeStakedBalance =
          await wineryContract.ownedUpgradeStakesBalance(account);

        if (grapeTokenBalance !== "" && vintageWineTokenBalance !== "")
          dispatch(
            setUserTokenBalance({
              grapeTokenBalance: Number(grapeTokenBalance) / Math.pow(10, 18),
              vintageWineTokenBalance:
                Number(vintageWineTokenBalance) / Math.pow(10, 18),
              vintnerBalance: Number(vintnerBalance),
              upgradeBalance: Number(upgradeBalance),
              vintnerStakedBalance: Number(vintnerStakedBalance),
              upgradeStakedBalance: Number(upgradeStakedBalance),
            })
          );

        // Get total staked amount
        // dispatch(
        //   setLoading({
        //     isLoading: false,
        //   })
        // );
      };
      getBalance();
    }
  }, [
    account,
    chainId,
    dispatch,
    grapeTokenContract,
    vintnerContract,
    upgradeContract,
    vintageWineTokenContract,
    wineryContract,
  ]);

  return null;
}
