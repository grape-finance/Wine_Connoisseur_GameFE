import { configureStore } from "@reduxjs/toolkit";
import application from "state/application/reducer";
import token from "state/token/reducer";
import user from "state/user/reducer";
import multicall from "state/multicall/reducer";

export const store = configureStore({
  reducer: {
    application,
    token,
    multicall,
    user,
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
