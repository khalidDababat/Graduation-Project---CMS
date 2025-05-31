import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ChangePassword.module.css";

const ForgotePassword = () => {
  const location = useLocation();
  const role = location.state?.role ;


//  console.log("Role passed from login page:", role);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/request-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      if (!res.ok) {
        setError("البريد الإلكتروني غير موجود ");
        setTimeout(() => {
          setError("");
        }, 6000);
        throw new Error("البريد الإلكتروني غير موجود");
      }

      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
      setEmail("");
      setTimeout(() => {
        setMessage("");
      }, 6000);
    } catch (err) {
      setError(err.message);
    }
  };

  function closeAlert() {
    document.getElementById("close").style.display = "none";
  }

  return (
    <Fragment>
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">نسيت كلمة المرور؟</h3>

        {message && (
          <div id="close" className="alert alert-success">
            {message}
            <span onClick={() => closeAlert()} className={styles.close_alert}>
              X
            </span>
          </div>
        )}
        {error && (
          <div className="alert alert-danger">
            {error}
            <span onClick={() => closeAlert()} className={styles.close_alert}>
              X
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني"
            required
          />

          <button type="submit" className="btn btn-primary w-100">
            إرسال رابط تعيين كلمة السر
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotePassword;
