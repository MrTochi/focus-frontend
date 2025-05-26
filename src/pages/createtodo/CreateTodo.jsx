import React, { useState } from "react";
import styles from "./CreateTodo.module.css";
import { useSelector } from "react-redux";
import { apiArray } from "../../helpers/api/api";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    reminder: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(apiArray.createTodo.url, {
        method: apiArray.createTodo.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log(data);

      toast.success(data.message || "Todo created successfully!");
      setForm({
        title: "",
        description: "",
        dueDate: "",
        reminder: "",
        priority: "medium",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Todo</h2>
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
          {loading ? "Creating..." : "Create Todo"}
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
