import axios from "axios";
import { GRAPE_ADDRESS, USDC_VINTAGEWINE_LP_ADDRESS } from "config/address";
import {
  useMIMContract,
  usePriceOracleContract,
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
  const lpContract = useUSDCVintageWineLPContract();
  const priceOracleContract = usePriceOracleContract();
  // deep-index.moralis.io/api/v2/erc20/0x5541D83EFaD1f281571B343977648B75d95cdAC2/price?chain=avalanche

  useEffect(() => {
    const config = {
      method: "get",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=grape-finance&vs_currencies=usd`,
    };
    const getPrice = async () => {
      if (
        chainId &&
        vintageWineContract &&
        mimContract &&
        lpContract &&
        priceOracleContract
      ) {
        try {
          let lpPrice = 0;
          const grapePrice = await priceOracleContract.latestGrapePrice();
          const MIMBalance = await mimContract.balanceOf(
            USDC_VINTAGEWINE_LP_ADDRESS[chainId]
          );
          const vinatageBalance = await vintageWineContract.balanceOf(
            USDC_VINTAGEWINE_LP_ADDRESS[chainId]
          );
          const lpSupply = await lpContract.totalSupply();
          lpPrice = (MIMBalance * 2) / lpSupply;

          const grapeMIMTJPrice = await priceOracleContract.grapeTjLPVal();
          const grapeMIMSWPrice = await priceOracleContract.grapeSwLPVal();
          const xGrapePrice = await priceOracleContract.xGrapePrice();
          const mimPrice = await priceOracleContract.latestMimPriceFormatted();
          dispatch(
            setTokenPrice({
              grapePrice: Number(grapePrice) / 1e18,
              vintageWinePrice: +MIMBalance / +vinatageBalance,
              lpPrice: lpPrice,
              grapeMIMTJPrice: Number(grapeMIMTJPrice) / 1e18,
              grapeMIMSWPrice: Number(grapeMIMSWPrice) / 1e18,
              xGrapePrice: Number(xGrapePrice) / 1e18,
              MIMPrice: Number(mimPrice) / 1e18,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    };
    getPrice();
  }, [
    dispatch,
    chainId,
    vintageWineContract,
    mimContract,
    priceOracleContract,
  ]);

  return null;
}
