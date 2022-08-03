import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: {
      accessToken : ""
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.value.accessToken = action.payload.accessToken;
    },
    deleteToken : (state)=>{
      state.value.accessToken= "";
    }

  },
});

export const { setToken, deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer;
