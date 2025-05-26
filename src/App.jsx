import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { apiArray } from "./helpers/api/api";
import { setUser } from "./helpers/redux/userSlice";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import CreateTodo from "./pages/createtodo/CreateTodo";
import AllUsers from "./pages/allusers/AllUsers";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import TodoList from "./pages/todolist/TodoList";
import EditTodo from "./pages/editTodos/EditTodo";
import Settings from "./pages/settings/Settings";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import PrivateRoute from "./helpers/privateRoute";
import NotFound from "./helpers/notfound/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // Safely parse the token from localStorage
    const stored = localStorage.getItem("token");
    let token = null;
    try {
      token = stored ? JSON.parse(stored) : null;
    } catch {
      token = stored;
    }

    // Async session restore
    async function restoreSession() {
      if (token) {
        try {
          const response = await fetch(apiArray.getUser.url, {
            method: apiArray.getUser.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });
          const data = await response.json();
          if (data.success) {
            dispatch(setUser(data.user));
          } else {
            localStorage.removeItem("token");
          }
        } catch (err) {
          toast.error("Session restore failed, please log in again.");
          localStorage.removeItem("token");
        }
      }
      setLoadingUser(false);
    }

    restoreSession();
  }, [dispatch]);

  // Show loading screen while restoring session
  if (loadingUser) {
    return <div className="loading-screen">Restoring session…</div>;
  }
  return (
    <div>
      <ToastContainer position="top-right" />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes for Authenticated Users */}
        <Route
          path="/create-todo"
          element={
            <PrivateRoute>
              <CreateTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-todo/:id"
          element={
            <PrivateRoute>
              <EditTodo />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Admin-only Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <PrivateRoute requiredRole="admin">
              <AllUsers />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
