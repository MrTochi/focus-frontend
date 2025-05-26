import React, { useEffect, useState } from "react";
import styles from "./EditTodo.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { apiArray } from "../../helpers/api/api";
import { toast } from "react-toastify";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    reminder: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const fetchTodo = async () => {
    try {
      const res = await fetch(`${apiArray.getTodoById.url}/${id}`, {
        method: apiArray.getTodoById.method,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const { title, description, dueDate, reminder, priority } = data.todo;
      setForm({
        title,
        description,
        dueDate: dueDate ? dueDate.slice(0, 10) : "",
        reminder: reminder ? reminder.slice(0, 16) : "",
        priority,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiArray.editTodo.url}/${id}`, {
        method: apiArray.editTodo.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Todo updated successfully!");
      navigate("/todos");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Todo</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="4"
            required
          />
        </label>

        <label>
          Due Date
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Reminder (Date & Time)
          <input
            type="datetime-local"
            name="reminder"
            value={form.reminder}
            onChange={handleChange}
          />
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Todo"}
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
