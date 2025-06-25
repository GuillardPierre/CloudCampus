export const selectTodos = (state) => state.todos;

export const selectCompletedTodos = (state) =>
  state.todos.filter((todo) => todo.completed);
