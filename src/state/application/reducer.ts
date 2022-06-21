import { updateBlockNumber, setOpenModal, setLoading } from "./actions";
import { createReducer } from "@reduxjs/toolkit";

export enum ApplicationModal {
  WALLET,
}

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly openModal: ApplicationModal | null;
  isLoading: boolean;
}

const initialState: ApplicationState = {
  blockNumber: {},
  openModal: null,
  isLoading: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== "number") {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId]
        );
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    })
);
