import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      tel: "",
      nickname: "",
      email: "",
    },
  },
  reducers: {
    me: (state, action) => {
      state.value = action.payload;
    },
    update : (state,action)=>{
      state.value = action.payload;
    }
  },
});

export const { me,update } = userSlice.actions;

export default userSlice.reducer;
