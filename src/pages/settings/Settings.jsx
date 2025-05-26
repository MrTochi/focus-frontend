import React, { useState } from "react";
import styles from "./Settings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apiArray } from "../../helpers/api/api";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../helpers/redux/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(apiArray.updateUser.url, {
        method: apiArray.updateUser.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message || "Profile updated successfully!");
      dispatch(setUser(data.user));
      console.log(data.user);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiArray.deleteUser.url}/${user._id}`, {
        method: apiArray.deleteUser.method,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message || "Account deleted successfully");
      dispatch(setUser(null));
      localStorage.removeItem("token");
      navigate("/register");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Account Settings</h2>

      <div className={styles.info}>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {user?.isVerified ? "✅ Verified" : "❌ Not Verified"}
        </p>
      </div>

      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          Name
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          New Password
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <button className={styles.deleteBtn} onClick={() => setShowConfirm(true)}>
        Delete My Account
      </button>

      {showConfirm && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Confirm Deletion</h3>
            <p>This action cannot be undone. Are you sure?</p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className={styles.confirmDelete} onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
