import { createAction } from "@reduxjs/toolkit";

export const setTokenPrice = createAction<{
  grapePrice: number;
  vintageWinePrice: number;
}>("token/setUserTokenBalance");
