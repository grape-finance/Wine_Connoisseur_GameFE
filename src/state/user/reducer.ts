import { createReducer } from "@reduxjs/toolkit";
import {
  setUserTokenBalance,
  setLoading,
  setNFTInfo,
  setUserNFTState,
} from "./actions";

export interface TokenState {
  isLoading: boolean;
  grapeTokenBalance: number;
  raisinTokenBalance: number;
  grapeMIMTJTokenBalance: number;
  grapeMIMSWTokenBalance: number;
  xGrapeTokenBalance: number;
  vintageMIMTokenBalance: number;
  vintageWineTokenBalance: number;
  USDCVintageWineLPBalance: number;
  vintnerBalance: number;
  upgradeBalance: number;
  vintnerStakedBalance: number;
  upgradeStakedBalance: number;
  vintnerTotalStakedBalance: number;
  upgradeTotalStakedBalance: number;
  fatigueAccrued: number;
  timeUntilFatigues: number;
  vintageWineAccrued: number;
  vintageWinePerMinute: number;
}

const initialState: TokenState = {
  isLoading: false,
  grapeTokenBalance: 0,
  raisinTokenBalance: 0,
  grapeMIMTJTokenBalance: 0,
  grapeMIMSWTokenBalance: 0,
  xGrapeTokenBalance: 0,
  vintageMIMTokenBalance: 0,
  vintageWineTokenBalance: 0,
  USDCVintageWineLPBalance: 0,
  vintnerBalance: 0,
  upgradeBalance: 0,
  vintnerStakedBalance: 0,
  upgradeStakedBalance: 0,
  vintnerTotalStakedBalance: 0,
  upgradeTotalStakedBalance: 0,
  fatigueAccrued: 0,
  timeUntilFatigues: 0,
  vintageWineAccrued: 0,
  vintageWinePerMinute: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setLoading, (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    })
    .addCase(setUserTokenBalance, (state, action) => {
      const {
        grapeTokenBalance,
        raisinTokenBalance,
        grapeMIMTJTokenBalance,
        grapeMIMSWTokenBalance,
        xGrapeTokenBalance,
        vintageMIMTokenBalance,
        vintageWineTokenBalance,
        USDCVintageWineLPBalance,
        vintnerBalance,
        upgradeBalance,
        vintnerStakedBalance,
        upgradeStakedBalance,
      } = action.payload;
      if (grapeTokenBalance) state.grapeTokenBalance = grapeTokenBalance;
      if (raisinTokenBalance) state.raisinTokenBalance = raisinTokenBalance;
      if (grapeMIMTJTokenBalance) state.grapeMIMTJTokenBalance = grapeMIMTJTokenBalance;
      if (grapeMIMSWTokenBalance) state.grapeMIMSWTokenBalance = grapeMIMSWTokenBalance;
      if (xGrapeTokenBalance) state.xGrapeTokenBalance = xGrapeTokenBalance;
      if (vintageMIMTokenBalance) state.vintageMIMTokenBalance = vintageMIMTokenBalance;
      if (vintageWineTokenBalance)
        state.vintageWineTokenBalance = vintageWineTokenBalance;
      if (USDCVintageWineLPBalance)
        state.USDCVintageWineLPBalance = USDCVintageWineLPBalance;
      state.vintnerBalance = vintnerBalance;
      state.upgradeBalance = upgradeBalance;
      state.vintnerStakedBalance = vintnerStakedBalance;
      state.upgradeStakedBalance = upgradeStakedBalance;
    })
    .addCase(setNFTInfo, (state, action) => {
      const { vintnerTotalStakedBalance, upgradeTotalStakedBalance } =
        action.payload;
      state.vintnerTotalStakedBalance = vintnerTotalStakedBalance;
      state.upgradeTotalStakedBalance = upgradeTotalStakedBalance;
    })
    .addCase(setUserNFTState, (state, action) => {
      const {
        fatigueAccrued,
        timeUntilFatigues,
        vintageWineAccrued,
        vintageWinePerMinute,
      } = action.payload;
      if (fatigueAccrued) state.fatigueAccrued = fatigueAccrued;
      if (timeUntilFatigues) state.timeUntilFatigues = timeUntilFatigues;
      if (vintageWineAccrued) state.vintageWineAccrued = vintageWineAccrued;
      if (vintageWinePerMinute)
        state.vintageWinePerMinute = vintageWinePerMinute;
    })
);
