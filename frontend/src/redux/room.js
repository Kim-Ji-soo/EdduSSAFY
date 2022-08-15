import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomTitle: "",
    roomId: "",
    hostId: "",
    rooms: [],
    roomResult: [],
  },
  reducers: {
    setRoom: (state, action) => {
      state.roomTitle = action.payload.title;
      state.roomId = action.payload.roomId;
      state.hostId = action.payload.hostId;
    },
    getRooms: (state, action) => {
      state.rooms = action.payload;
    },
    getRoomResult: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
