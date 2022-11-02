import { createReducer } from "@reduxjs/toolkit";
import { setTokenPrice } from "./actions";

export interface TokenState {
  grapePrice: number;
  vintageWinePrice: number;
  lpPrice: number;
  grapeMIMTJPrice: number;
  grapeMIMSWPrice: number;
  xGrapePrice: number;
  MIMPrice: number;
}

const initialState: TokenState = {
  grapePrice: 0,
  vintageWinePrice: 0,
  lpPrice: 0,
  grapeMIMSWPrice: 0,
  grapeMIMTJPrice: 0,
  xGrapePrice: 0,
  MIMPrice: 0,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setTokenPrice, (state, action) => {
    const {
      grapePrice,
      vintageWinePrice,
      lpPrice,
      grapeMIMTJPrice,
      grapeMIMSWPrice,
      xGrapePrice,
      MIMPrice,
    } = action.payload;
    state.grapePrice = grapePrice;
    state.vintageWinePrice = vintageWinePrice;
    state.lpPrice = lpPrice;
    state.grapeMIMTJPrice = grapeMIMTJPrice;
    state.grapeMIMSWPrice = grapeMIMSWPrice;
    state.xGrapePrice = xGrapePrice;
    state.MIMPrice = MIMPrice;
  })
);
