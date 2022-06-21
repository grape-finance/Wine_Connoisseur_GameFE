import { createReducer } from "@reduxjs/toolkit";
import { setTokenPrice } from "./actions";

export interface TokenState {
  grapePrice: number;
  vintageWinePrice: number;
}

const initialState: TokenState = {
  grapePrice: 0,
  vintageWinePrice: 0,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setTokenPrice, (state, action) => {
    const { grapePrice, vintageWinePrice } = action.payload;
    console.log("action.payload", action.payload);
    state.grapePrice = grapePrice;
    state.vintageWinePrice = vintageWinePrice;
  })
);
