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
      url: `https://deep-index.moralis.io/api/v2/erc20/${GRAPE_ADDRESS[43114]}/price?chain=avalanche`,
      headers: {
        "x-api-key":
          "o4APhPnPagfzQ8sLAohU6wZlV23r9T1tO4j3S40htIoRFvQoChcS3xyElJ6sVvW8",
      },
    };
    const getPrice = async () => {
      try {
        let grapePrice;
        let vintageWinePrice = 0.1;
        const response = await axios(config);
        grapePrice = response?.data.usdPrice;
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
