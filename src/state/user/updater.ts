import { setTokenBalance, setLoading } from "./actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useContract } from "hooks/useContract";
import GRAPE_TOKEN_ABI from "abi/grape.json";
import VINTAGEWINE_TOKEN_ABI from "abi/vintageWine.json";
import { useWeb3 } from "state/web3";
import {
  GRAPE_ADDRESS,
  VINTAGEWINE_ADDRESS,
  SupportedChainId,
} from "config/address";
// import Web3 from "web3";

export default function Updater(): null {
  const dispatch = useDispatch();

  const { account, chainId } = useWeb3();
  const grapeTokenContract = useContract(
    GRAPE_ADDRESS[chainId!],
    GRAPE_TOKEN_ABI
  );
  console.log("grapeTokenContract", grapeTokenContract);
  const vintageWineTokenContract = useContract(
    VINTAGEWINE_ADDRESS[chainId!],
    VINTAGEWINE_TOKEN_ABI
  );
  console.log("vintageWineTokenContract", vintageWineTokenContract);

  useEffect(() => {
    // Get User balance of Grape and VintageWine

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
        console.log("grapeTokenBalance", grapeTokenBalance);
        console.log("vintageWineTokenBalance", vintageWineTokenBalance);
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
