import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { apiArray } from "../../helpers/api/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    totalTodos: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Fetch users
      const userRes = await fetch(apiArray.fetchUsers.url, {
        method: "GET",
        credentials: "include",
      });
      const userData = await userRes.json();
      if (!userRes.ok) throw new Error(userData.message);

      const totalUsers = userData.users.length;
      const verifiedUsers = userData.users.filter((u) => u.isVerified).length;

      // Fetch todos
      const todoRes = await fetch(apiArray.getTodos.url, {
        method: "GET",
        credentials: "include",
      });
      const todoData = await todoRes.json();
      if (!todoRes.ok) throw new Error(todoData.message);

      const totalTodos = todoData.todos.length;

      setStats({ totalUsers, verifiedUsers, totalTodos });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className={styles.card}>
            <h3>Verified Users</h3>
            <p>{stats.verifiedUsers}</p>
          </div>
          <div className={styles.card}>
            <h3>Total Todos</h3>
            <p>{stats.totalTodos}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
