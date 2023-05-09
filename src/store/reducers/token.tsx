import { userApi } from "@/apis/user";
import { createSlice } from "@reduxjs/toolkit";

export interface TokenState {
  access_token: "";
  user: "";
}

const initialState: TokenState = {
  access_token: "",
  user: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, setValue) => {
      state.access_token = setValue.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
