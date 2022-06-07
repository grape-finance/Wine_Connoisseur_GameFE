import { createAction } from "@reduxjs/toolkit";

export const setLoading = createAction<{
  isLoading: boolean;
}>("token/setLoading");

export const setTokenBalance = createAction<{
  grapeTokenBalance: number;
  vintageWineTokenBalance: number;
}>("token/setTokenBalance");
