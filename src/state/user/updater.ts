import { setTokenBalance, setLoading } from "./actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGrapeContract, useVintageWineContract } from "hooks/useContract";

import { useWeb3 } from "state/web3";
import { SupportedChainId } from "config/address";

export default function Updater(): null {
  const dispatch = useDispatch();

  const { account, chainId } = useWeb3();
  const grapeTokenContract = useGrapeContract();
  const vintageWineTokenContract = useVintageWineContract();

  useEffect(() => {
    // Get token balance of Grape and VintageWine
    if (
      account &&
      grapeTokenContract &&
      vintageWineTokenContract &&
      (chainId === SupportedChainId.MAINNET ||
        chainId === SupportedChainId.TESTNET)
    ) {
      const getBalance = async () => {
        dispatch(
          setLoading({
            isLoading: true,
          })
        );
        const grapeTokenBalance = await grapeTokenContract.balanceOf(account);
        const vintageWineTokenBalance =
          await vintageWineTokenContract.balanceOf(account);
        if (grapeTokenBalance !== "" && vintageWineTokenBalance !== "")
          dispatch(
            setTokenBalance({
              grapeTokenBalance: Number(grapeTokenBalance) / Math.pow(10, 18),
              vintageWineTokenBalance:
                Number(vintageWineTokenBalance) / Math.pow(10, 18),
            })
          );
        dispatch(
          setLoading({
            isLoading: false,
          })
        );
      };
      getBalance();
    }
  }, [
    account,
    chainId,
    dispatch,
    grapeTokenContract,
    vintageWineTokenContract,
  ]);

  return null;
}
