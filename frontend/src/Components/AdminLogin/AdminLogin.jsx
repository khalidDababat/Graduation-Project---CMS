import React, { Fragment } from "react";
import styles from "./AdminLogin.module.css";
import logo from "../../Assets/Logo-Image.jpg"; 
import AdminDashboard from "../../Components/AdminDashboard/AdminDashboard.jsx";

import { Link} from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
  //   const navigate = useNavigate();

    const [userType, setUserType] = useState("Admin");

    const [userName, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin");
    const [employeeID, setEmployeeID] = useState("");
    const [employeePassword, setEmployeePassword] = useState(""); 

     const handleSubmit = (e) => {
        e.preventDefault();
        if (userType === "Admin") { 
           if(userName === "admin" && password === "admin") {
            <AdminDashboard />

           }else{
            alert("Invalid username or password");
           }
      
      }
    }
  
    return (
      <Fragment>
        <div className="conteaner">
          <div className={styles.side}>
            <img src={logo} alt="logo" className={styles.side_img} />
          </div>
  
          <div className={styles.conteaner}>
            <h2 className={styles.heading_Conteaner}>Log In </h2>
            <div className="Login-App">
              <form action="">
                <div className="selected">
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className={styles.selected_Login}
                    name="Login"
                    id=""
                  >
                    <option value="Admin">مسؤول النظام</option>
                    <option value="Employee">موظف</option>
                  </select>
                </div>
                {userType === "Admin" && (
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
                        Forgot you password? <Link to="/ForgetPasswordAdmin"> Click here</Link>
                      </span>
                    </div>
                  </>
                )}
                {userType === "Employee" && (
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
                        نسيت كلمة المرور <Link to="/ForgetPasswordEmployee">تواصل مع مسؤول النظام </Link>
                      </span>
                    </div>
                  </Fragment>
                )}
  
                <div>
                  <button  className={styles.login_btn} type="submit">
                    تسجيل دخول
                    <Link to="/AdminDashboard">log in</Link>
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
