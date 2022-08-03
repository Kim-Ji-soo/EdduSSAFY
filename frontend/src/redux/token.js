import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: {
      accessToken: "",
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    deleteToken : (state)=>{
      state.value = "";
    }

  },
});

export const { setToken, deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer;
