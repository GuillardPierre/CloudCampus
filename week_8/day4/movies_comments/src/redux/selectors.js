import { createSelector } from 'reselect';

export const selectComments = (state) => state.comments;
export const selectValidComments = createSelector(
  [selectComments],
  (comments) => comments.filter((comment) => !comment.isDeleted)
);
