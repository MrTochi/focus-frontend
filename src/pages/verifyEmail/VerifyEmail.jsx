import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../verifyEmail/VerifyEmail.module.css";
import { apiArray } from "../../helpers/api/api";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying email...");
  console.log("Verification token:", token);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const res = await fetch(`${apiArray.verifyEmail.url}/${token}`, {
          method: apiArray.verifyEmail.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setMessage(data.message || "Verification failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setMessage(
          "Verification failed. The link might be expired or invalid."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return <div className={styles.container}>{message}</div>;
}
