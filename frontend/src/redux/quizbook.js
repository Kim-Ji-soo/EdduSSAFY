import { createSlice } from "@reduxjs/toolkit";

export const quizbookSlice = createSlice({
  name: "quizbooklist",
  initialState: {
    quizbook: [
      { id: 20220804104801 },
      { id: 20220804104803 },
      { id: 20220804104805 },
      ],
  },
  reducers: {
      addquizbook: (state, action) => {
      const newquizbook = action.payload;
      state.quizbook.push({
      quizbookId : newquizbook.id,
      })
      },
      removequizbook: (state, action) => {
        const id = action.payload;
        state.quizbook = state.quizbook.filter((item) => item.id !== id);
      },
    },
});

export const quizbookActions = quizbookSlice.actions;

export default quizbookSlice.reducer;
