import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { api } from "./api";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: storage,
      whitelist: ["authSlice"],
    },
    reducers
  ),
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);

export default store;
