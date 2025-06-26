import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.push({
        id: Date.now(),
        note: action.payload.note,
        comment: action.payload.comment,
        isDeleted: false,
      });
    },
    deleteComment: (state, action) => {
      const comment = state.find((comment) => action.payload === comment.id);
      if (comment) {
        comment.isDeleted = true;
      }
    },
  },
});

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
