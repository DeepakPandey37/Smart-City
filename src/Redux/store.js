import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import complaintSlice from "./complaintSlice"
import applicantSlice from "./applicantSlice"
const rootReducer = combineReducers({
  auth: authSlice,
  complaint: complaintSlice,
  applicant : applicantSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };