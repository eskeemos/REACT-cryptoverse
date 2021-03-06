import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoApi } from "../services/cryptoApi";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  }
});