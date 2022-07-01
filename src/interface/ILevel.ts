import { BigNumber } from "ethers";

export interface ILevel {
  name?: string;
  description?: string;
  supply: BigNumber;
  maxSupply: BigNumber;
  priceVintageWine: BigNumber;
  priceGrape: BigNumber;
  yield: BigNumber;
  image: any;
}
