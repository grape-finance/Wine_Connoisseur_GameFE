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
  vintageWineTokenBalance: number;
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
  vintageWineTokenBalance: 0,
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
        vintageWineTokenBalance,
        vintnerBalance,
        upgradeBalance,
        vintnerStakedBalance,
        upgradeStakedBalance,
      } = action.payload;
      if (grapeTokenBalance) state.grapeTokenBalance = grapeTokenBalance;
      if (vintageWineTokenBalance)
        state.vintageWineTokenBalance = vintageWineTokenBalance;
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
