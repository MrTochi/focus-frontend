import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../helpers/redux/userSlice";
import { apiArray } from "../../helpers/api/api";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch(apiArray.logout.url, {
        method: apiArray.logout.method,
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        dispatch(logoutUser());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handlemenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/">Focus_Pad</Link>
      </div>
      <ul className={`${styles.links} ${isMenuOpen ? styles.active : ""}`}>
        {!user ? (
          <>
            <li>
              <Link to="/" onClick={handlemenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handlemenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={handlemenu}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.greeting}>Hi {user?.name?.split(" ")[0]}</li>
            <li>
              <Link to="/" onClick={handlemenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/todos" onClick={handlemenu}>
                Todos
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={handlemenu}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                onClick={() => {
                  handleLogout();
                  handlemenu();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className={styles.menuIcon}>
        {isMenuOpen ? (
          <FaTimes size={20} className="FaTimes" onClick={handlemenu} />
        ) : (
          <FaBars size={20} className="FaBars" onClick={handlemenu} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
