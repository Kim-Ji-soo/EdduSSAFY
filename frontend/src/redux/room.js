import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomTitle: "",
    roomId: "",
    rooms: [],
  },
  reducers: {
    setRoom: (state, action) => {
      state.roomTitle = action.payload.title;
      state.roomId = action.payload.roomId;
    },
    getRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
