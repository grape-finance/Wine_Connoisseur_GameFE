import { createAction } from "@reduxjs/toolkit";

export const setLoading = createAction<{
  isLoading: boolean;
}>("user/setLoading");

export const setNFTInfo = createAction<{
  vintnerTotalStakedBalance: number;
  upgradeTotalStakedBalance: number;
}>("user/setNFTInfo");


export const setUserTokenBalance = createAction<{
  grapeTokenBalance: number;
  vintageWineTokenBalance: number;
  vintnerBalance: number;
  upgradeBalance: number;
  vintnerStakedBalance: number;
  upgradeStakedBalance: number;
}>("user/setUserTokenBalance");
