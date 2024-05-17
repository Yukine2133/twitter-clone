import { configureStore } from "@reduxjs/toolkit";
import tweetFormReducer from "./slices/tweetFormSlice";

const store = configureStore({
  reducer: {
    tweetForm: tweetFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
