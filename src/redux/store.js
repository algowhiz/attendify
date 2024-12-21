import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // import the user slice
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // local storage for persist

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user'], // persist only the user slice
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
