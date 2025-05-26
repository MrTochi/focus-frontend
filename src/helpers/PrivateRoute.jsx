import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Forbidden from "./forbiden/Forbidden";

const PrivateRoute = ({ children, requiredRole }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [redirect, setRedirect] = useState(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!userToken || !user) {
      toast.error("Unauthorized page. Login!");
      setTimeout(() => setRedirect("/login"), 100);
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      if (requiredRole && parsedUser.role !== requiredRole) {
        toast.error("Unauthorized page. Admins only!");
        setForbidden(true);
        return;
      }
    } catch (err) {
      toast.error("Invalid session. Please log in again.");
      setTimeout(() => setRedirect("/login"), 100);
    } finally {
      setIsChecking(false);
    }
  }, [requiredRole]);

  if (redirect) return <Navigate to={redirect} replace />;
  if (isChecking) return null;
  if (forbidden) return <Forbidden />;

  return children;
};

export default PrivateRoute;
