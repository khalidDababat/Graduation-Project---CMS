import React, { Fragment } from "react";
import styles from "./AdminLogin.module.css";
import logo from "../../Assets/Logo-Image.jpg";
import AdminDashboard from "../../Components/AdminDashboard/AdminDashboard.jsx";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = (e) => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [employeeID, setEmployeeID] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  const handelLogin = async () => {

          alert("Login");   

        //  if(userType === "admin"){
        //   console.log("Admin Login",userType);
        //   navigate("/AdminDashboard");
           
        // }

    //       const res = await fetch("http://localhost:5000/api/login", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           userName,
    //           password,
    //           role: userType
    //         })
    //       });
    //     const data = await res.json();
    //     console.log("The Data ",data);
    //     if(data.status === 200){
    //       navigate("/AdminDashboard");
    //   } else{
    //     alert("Invalid credentials");
    //   }
    // }else if(userType === "employee"){
    //   const res = await fetch("http://localhost:5000/api/employeeLogin",{
    //       method:"POST",
    //       headers:{
    //         "Content-Type":"application/json"
    //       },
    //       body:JSON.stringify({
    //         employeeID,
    //         employeePassword,
    //       })
    //     });
    //     const data = await res.json();
    //     if(res.status === 200){
    //       navigate("/EmployeeDashboard");
    //   } else{
    //     alert("Invalid credentials");
    //   }
    // }
  };





  return (
    <Fragment>
      <div className="conteaner">
        <div className={styles.side}>
          <img src={logo} alt="logo" className={styles.side_img} />
        </div>

        <div className={styles.conteaner}>
          <h2 className={styles.heading_Conteaner}>Log In </h2>
          <div className="Login-App">
            <form method="post" onSubmit={handelLogin}>
              <div className="selected">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className={styles.selected_Login}
                  name="Login"
                  id=""
                >
                  <option value="admin">مسؤول النظام</option>
                  <option value="employee">موظف</option>
                </select>
              </div>
              {userType === "admin" && (
                <>
                  <div className={styles.username}>
                    <label htmlFor="user">Username</label>
                    <input
                      className={styles.input_field}
                      id="user"
                      type="text"
                      name="user-name"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.password}>
                    <label htmlFor="pass">Password</label>
                    <input
                      className={styles.input_field}
                      id="pass"
                      type="password"
                      name="pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.forget_password}>
                    <span>
                      Forgot you password?{" "}
                      <Link to="/ForgetPasswordAdmin"> Click here</Link>
                    </span>
                  </div>
                </>
              )}
              {userType === "" && (
                <>
                  <div className={styles.username}>
                    <label htmlFor="user">Username</label>
                    <input
                      className={styles.input_field}
                      id="user"
                      type="text"
                      name="user-name"
                      required
                    />
                  </div>

                  <div className={styles.password}>
                    <label htmlFor="pass">Password</label>
                    <input
                      className={styles.input_field}
                      id="pass"
                      type="password"
                      name="pass"
                      required
                    />
                  </div>

                  <div className={styles.forget_password}>
                    <span>
                      Forgot you password?{" "}
                      <Link to="/ForgetPasswordAdmin"> Click here</Link>
                    </span>
                  </div>
                </>
              )}
              {userType === "employee" && (
                <Fragment>
                  <div className={styles.username}>
                    <label htmlFor="user">رقم الهوية</label>
                    <input
                      className={styles.input_field}
                      id="user"
                      type="text"
                      name="ُEmployeeID"
                      required
                    />
                  </div>

                  <div className={styles.password}>
                    <label htmlFor="pass">كلمة المرور</label>
                    <input
                      className={styles.input_field}
                      id="pass"
                      type="password"
                      name="pass"
                      required
                    />
                  </div>

                  <div className={styles.forget_password}>
                    <span>
                      نسيت كلمة المرور
                      <Link to="/ForgetPasswordEmployee">
                        تواصل مع مسؤول النظام
                      </Link>
                    </span>
                  </div>
                </Fragment>
              )}

              <div>
                <button className={styles.login_btn} type="submit">
                  تسجيل دخول
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
