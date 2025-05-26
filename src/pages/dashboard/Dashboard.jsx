import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles.container}>
      <h2>Welcome to your Dashboard, {user?.name?.split(" ")[0]}</h2>

      <div className={styles.grid}>
        <Link to="/settings" className={styles.card}>
          <h3>Settings</h3>
          <p>Manage your account preferences.</p>
        </Link>

        <Link to="/todos" className={styles.card}>
          <h3>Your Todos</h3>
          <p>View and manage your todo list.</p>
        </Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className={styles.card}>
              <h3>Admin Dashboard</h3>
              <p>See system stats and manage platform settings.</p>
            </Link>

            <Link to="/all-users" className={styles.card}>
              <h3>All Users</h3>
              <p>View and manage registered users.</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
