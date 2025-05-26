import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import image from "../../assets/hero.png";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Organize your day, focus your mind.</h1>
          <p>
            <strong>focus_pad</strong> helps you stay productive, manage your
            tasks, and never miss a deadline.
          </p>
          <div className={styles.buttons}>
            {user ? (
              <Link to="/create-todo" className={styles.primaryBtn}>
                Create Todo
              </Link>
            ) : (
              <>
                <Link to="/register" className={styles.primaryBtn}>
                  Get Started
                </Link>
                <Link to="/login" className={styles.secondaryBtn}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={image} alt="Task illustration" className={styles.image} />
        </div>
      </section>

      <section className={styles.features}>
        <h2>Why focus_pad?</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Smart Reminders</h3>
            <p>Never miss a deadline with built-in reminders and scheduling.</p>
          </div>
          <div className={styles.card}>
            <h3>Priority Planning</h3>
            <p>
              Stay on top of what's important by organizing tasks by urgency.
            </p>
          </div>
          <div className={styles.card}>
            <h3>Focus-Driven Design</h3>
            <p>
              Built for focus — with minimal distractions and powerful tools to
              help you stay in flow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
