import { ApplicationModal } from "./reducer";
import { createAction } from "@reduxjs/toolkit";

export const updateBlockNumber = createAction<{
  chainId: number;
  blockNumber: number;
}>("application/updateBlockNumber");

export const setOpenModal = createAction<ApplicationModal | null>(
  "application/setOpenModal"
);

export const setLoading = createAction<{
  isLoading: boolean;
}>("application/setLoading");
