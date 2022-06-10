import { createReducer } from "@reduxjs/toolkit";
import { setTokenBalance, setLoading } from "./actions";

export interface TokenState {
  isLoading: boolean;
  grapeTokenBalance: number;
  vintageWineTokenBalance: number;
}

const initialState: TokenState = {
  isLoading: false,
  grapeTokenBalance: 0,
  vintageWineTokenBalance: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setLoading, (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    })
    .addCase(setTokenBalance, (state, action) => {
      const { grapeTokenBalance, vintageWineTokenBalance } = action.payload;
      if (grapeTokenBalance) state.grapeTokenBalance = grapeTokenBalance;
      if (vintageWineTokenBalance)
        state.vintageWineTokenBalance = vintageWineTokenBalance;
    })
);
