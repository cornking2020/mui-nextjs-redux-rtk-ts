import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import { api } from "./api";

export const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  authSlice: AuthSlice,
});

export type RootReducer = ReturnType<typeof reducers>;

export default reducers;
