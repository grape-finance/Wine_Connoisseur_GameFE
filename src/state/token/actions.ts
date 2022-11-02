import { createAction } from "@reduxjs/toolkit";

export const setTokenPrice = createAction<{
  grapePrice: number;
  vintageWinePrice: number;
  lpPrice: number;
  grapeMIMTJPrice: number;
  grapeMIMSWPrice: number;
  xGrapePrice: number;
  MIMPrice: number;
}>("token/setUserTokenBalance");
