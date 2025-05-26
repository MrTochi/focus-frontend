import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.css";
import { apiArray } from "../../helpers/api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all todos on mount
  const fetchTodos = async () => {
    try {
      const res = await fetch(apiArray.getTodos.url, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTodos(data.todos);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete/incomplete
  const handleToggleComplete = async (id) => {
    try {
      const res = await fetch(`${apiArray.toggleCompleteTodo.url}/${id}`, {
        method: apiArray.toggleCompleteTodo.method,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Todo updated.");
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiArray.deleteTodo.url}/${id}`, {
        method: apiArray.deleteTodo.method,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Your Todos</h2>
      <Link to="/create-todo" className={styles.primaryBtn}>
        Create Todo
      </Link>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : todos.length === 0 ? (
        <p className={styles.noTodos}>
          No todos found. <Link to="/create-todo">Create one?</Link>
        </p>
      ) : (
        <div className={styles.grid}>
          {[...todos]
            .sort((a, b) => Number(b.completed) - Number(a.completed))
            .map((todo) => (
              <div key={todo._id} className={styles.card}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>

                <div className={styles.meta}>
                  {todo.dueDate && (
                    <span>
                      <strong>Due:</strong>{" "}
                      {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  {todo.reminder && (
                    <span className={styles.reminder}>
                      🔔 Reminder: {new Date(todo.reminder).toLocaleString()}
                    </span>
                  )}
                  <span>
                    <strong>Status:</strong>{" "}
                    {todo.completed ? "✅ Completed" : "⏳ Pending"}
                  </span>
                  <span>
                    <strong>Priority:</strong>{" "}
                    {todo.priority?.charAt(0).toUpperCase() +
                      todo.priority.slice(1)}
                  </span>
                </div>

                <div className={styles.actions}>
                  <Link
                    to={`/edit-todo/${todo._id}`}
                    className={styles.editBtn}
                  >
                    Edit
                  </Link>
                  <button
                    className={styles.toggleBtn}
                    onClick={() => handleToggleComplete(todo._id)}
                  >
                    {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
