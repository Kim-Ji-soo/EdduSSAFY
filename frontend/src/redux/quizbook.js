import { createSlice } from "@reduxjs/toolkit";

const initialState = { quizbook: [] };

export const quizbookSlice = createSlice({
  name: "quizbooklist",
  initialState,
  reducers: {
    addquizbook: (state, action) => {
      const newquizbook = action.payload;
      state.quizbook.push(newquizbook);
    },
    changequizbook: (state, action) => {},
    removequizbook: (state, action) => {
      const id = action.payload;
      state.quizbook = state.quizbook.filter((item) => item.quizbookId !== id);
    },
  },
});

export const quizbookActions = quizbookSlice.actions;

export default quizbookSlice.reducer;
