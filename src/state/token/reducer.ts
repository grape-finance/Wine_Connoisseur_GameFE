import { createReducer } from "@reduxjs/toolkit";
import { setTokenPrice } from "./actions";

export interface TokenState {
  grapePrice: number;
  vintageWinePrice: number;
  lpPrice: number;
}

const initialState: TokenState = {
  grapePrice: 0,
  vintageWinePrice: 0,
  lpPrice: 0,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setTokenPrice, (state, action) => {
    const { grapePrice, vintageWinePrice, lpPrice } = action.payload;
    state.grapePrice = grapePrice;
    state.vintageWinePrice = vintageWinePrice;
    state.lpPrice = lpPrice;
  })
);
