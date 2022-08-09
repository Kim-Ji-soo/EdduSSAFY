import { createSlice } from "@reduxjs/toolkit";

const initialState = { quizbooks: [], quizsInQuizbooks: [] };

export const quizbookSlice = createSlice({
  name: "quizbooklist",
  initialState,
  reducers: {
    getquizbook: (state, action) => {
      state.quizbooks = action.payload.quizbooks;
      state.quizsInQuizbooks = action.payload.quizsInQuizbooks;
    },
    changequizbook: (state, action) => {},
    removequizbook: (state, action) => {
      const id = action.payload;
      state.quizbooks = state.quizbooks.filter(
        (item) => item.quizbookId !== id
      );
    },
  },
});

export const quizbookActions = quizbookSlice.actions;

export default quizbookSlice.reducer;
