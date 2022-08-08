import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      userId : "",
      name : "",
      nickName: "",
      tel: "",
      email: "",
    },
  },
  reducers: {
    me: (state, action) => {
      state.value = action.payload;
    },
    update : (state,action)=>{
      state.value = action.payload;
    },
    logout : (state) =>{
      state.value.userId = "";
      state.value.name = "";
      state.value.nickName = "";
      state.value.tel = "";
      state.value.email = "";
    }
  },
});

export const { me,update,logout } = userSlice.actions;

export default userSlice.reducer;
