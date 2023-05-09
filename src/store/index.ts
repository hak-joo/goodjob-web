import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sidebar";
import tokenReducer from "./reducers/token";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
