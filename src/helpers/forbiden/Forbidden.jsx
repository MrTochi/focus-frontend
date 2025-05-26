import React from "react";
import styles from "./Forbidden.module.css";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className={styles.container}>
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/" className={styles.homeLink}>
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
