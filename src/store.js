import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      text: "HW",
      completed: false,
    },
  ],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      const todoIdx = state.todos.findIndex((todo) => todo.id == id);
      console.log(todoIdx, text, completed);

      state.todos[todoIdx] = { ...state.todos[todoIdx], completed, text };

      //   if(todoIdx){

      //   }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo } =
  todoSlice.actions;

export default configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
