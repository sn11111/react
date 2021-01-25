import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoTypes } from "../types/Todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const baseUrl = "http://localhost:8001";

  useEffect(() => {
    fetchTodos();
  }, []);

  const formData: TodoTypes = {
    name: name,
    description: description,
    status: false,
  };

  const fetchTodos = async () => {
    await axios
      .get(baseUrl + "/todos")
      .then(({ data: { todos } }: TodoTypes[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await axios
      .post(`${baseUrl}/addtodo/`, formData)
      .then((res) => {
        console.log(res);
        setTodos(res.data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = async (
    todo: TodoTypes,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await axios
      .put(`${baseUrl}/edit-todo/${todo._id}`, {
        name: todo.name,
        description: todo.description,
        status: event.target.checked,
      })
      .then(({ data }) => {
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = async (_id: string | undefined) => {
    await axios
      .delete(`${baseUrl}/delete-todo/${_id}`)
      .then(({ data }) => {
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleNameFieldChanges = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleDescriptionFieldChanges = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <div className="main">
      <input
        value={name}
        onChange={handleNameFieldChanges}
        placeholder="name"
      />
      <input
        value={description}
        onChange={handleDescriptionFieldChanges}
        placeholder="description"
      />
      <button onClick={handleSaveTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <>
            <div className="todoList">
              <input
                type="checkbox"
                onChange={(event) => handleUpdateTodo(todo, event)}
                checked={todo.status}
              />
              <li key={todo._id} className={todo.status ? "done" : ""}>
                <p>name: {todo.name}</p>
                <p>descriptiion: {todo.description}</p>
              </li>
            </div>
            <button
              className="deleteButton"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              delete
            </button>
          </>
        ))}
      </ul>
    </div>
  );
};

export default App;
