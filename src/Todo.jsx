import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, updateTodo } from "./store";

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const [text, setText] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        id: Math.random() * 10,
        text,
        completed: false,
      })
    );
    setText("");
  };

  const handleUpdateTodo = (todo) => {
    setUpdateId(todo.id);
    setText(todo.text);
  };

  const handleSaveUpdate = () => {
    dispatch(
      updateTodo({
        id: updateId,
        text,
        completed: false, // You can change this as needed
      })
    );
    setUpdateId(null);
    setText("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>
                Delete
              </button>
              <button onClick={() => handleUpdateTodo(todo)}>Update</button>
            </li>
          ))}
      </ul>
      {/* updated todo */}
      {updateId && <button onClick={handleSaveUpdate}>Save</button>}
    </div>
  );
};

export default TodoApp;
