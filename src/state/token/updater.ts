import axios from "axios";
import { GRAPE_ADDRESS, USDC_VINTAGEWINE_LP_ADDRESS } from "config/address";
import {
  useMIMContract,
  useUSDCVintageWineLPContract,
  useVintageWineContract,
} from "hooks/useContract";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWeb3 } from "state/web3";
import { setTokenPrice } from "./actions";

export default function Updater(): null {
  const dispatch = useDispatch();
  const { chainId } = useWeb3();
  const vintageWineContract = useVintageWineContract();
  const mimContract = useMIMContract();

  // deep-index.moralis.io/api/v2/erc20/0x5541D83EFaD1f281571B343977648B75d95cdAC2/price?chain=avalanche

  useEffect(() => {
    const config = {
      method: "get",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=grape-finance&vs_currencies=usd`,
    };
    const getPrice = async () => {
      if (chainId && vintageWineContract && mimContract) {
        try {
          let grapePrice;
          const response = await axios(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=grape-finance`
          );
          grapePrice = response.data[0].current_price;
          const MIMBalance = await mimContract.balanceOf(
            USDC_VINTAGEWINE_LP_ADDRESS[chainId]
          );
          const vinatageBalance = await vintageWineContract.balanceOf(
            USDC_VINTAGEWINE_LP_ADDRESS[chainId]
          );
          dispatch(
            setTokenPrice({
              grapePrice,
              vintageWinePrice: +MIMBalance / +vinatageBalance,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    };
    getPrice();
  }, [dispatch, chainId, vintageWineContract, mimContract]);

  return null;
}
