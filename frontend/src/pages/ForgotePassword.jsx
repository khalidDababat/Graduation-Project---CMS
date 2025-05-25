import React, { Fragment, useState } from "react";

const ForgotePassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني");
      return; 
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        throw new Error("البريد الإلكتروني غير موجود");
      }

      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Fragment>
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">نسيت كلمة المرور؟</h3>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

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
