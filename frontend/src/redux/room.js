import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomTitle: "",
    roomId: "",
  },
  reducers: {
    setRoom: (state, action) => {
      state.roomTitle = action.payload.title;
      state.roomId = action.payload.roomId;
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
