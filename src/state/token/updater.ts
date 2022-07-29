import axios from "axios";
import { GRAPE_ADDRESS } from "config/address";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenPrice } from "./actions";

export default function Updater(): null {
  const dispatch = useDispatch();

  // deep-index.moralis.io/api/v2/erc20/0x5541D83EFaD1f281571B343977648B75d95cdAC2/price?chain=avalanche

  useEffect(() => {
    const config = {
      method: "get",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=grape-finance&vs_currencies=usd`,
    };
    const getPrice = async () => {
      try {
        let grapePrice;
        let vintageWinePrice = 0.10;
        const response = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=grape-finance`);     
        grapePrice = response.data[0].current_price;
        dispatch(
          setTokenPrice({
            grapePrice,
            vintageWinePrice,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getPrice();
  }, [dispatch]);

  return null;
}
