import React, { Fragment } from "react";
import styles from "./AdminLogin.module.css";
import logo from "../../Assets/Logo-Image.jpg";
import AdminDashboard from "../../Components/AdminDashboard/AdminDashboard.jsx";
import EmployeePage from "../EmployeePage/EmployeePage.jsx"; 

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("admin");
  
  const [messageFeild ,setmessageFeild] =useState(""); 

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const [ID_Number, setID_Number] = useState("");
  const [passwordEmployee, setPasswordEmployee] = useState("");

  const handelLogin = async (e) => {
      e.preventDefault();
    if (userType === "admin") {

      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:username.trim(),
          password: password.trim(),
          role    : userType, 

          
        }),
             
         
      
      }); 
         

     
      const data = await res.json();
      // console.log("The Data ",res.status);
      if (res.status === 200) {
        navigate("/AdminDashboard");
      } else {
        // alert("Invalid credentials");
        setmessageFeild(" Username Or Password is Wrong!")
        setTimeout(() => {
           setmessageFeild("");
        }, 7000);
      }
   
    
    
    }else if(userType === "employee"){
      const res = await fetch("http://localhost:5000/api/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            ID_Number: ID_Number.trim(),
            password: passwordEmployee.trim(),
            role    : userType, 
          })
        });
        const data = await res.json();
       // console.log("for testing ",employeeID.trim() ," ",employeePassword.trim()); 
        console.log("the Data is:",data);
        if(res.status === 200){
          navigate("/EmployeePage");
      } else{
        // alert("Invalid credentials"); 
        setmessageFeild(" Username Or Password is Wrong!")
        setTimeout(() => {
           setmessageFeild("");
        }, 7000);
      }
    }
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
           {messageFeild && (
            <div className="alert alert-danger text-center" role="alert">
                {messageFeild}
            </div>
           )}

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
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.password}>
                    <label  htmlFor="pass">Password</label>
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
                      name="ُID_Number" 
                      value={ID_Number} 
                      onChange={(e)=> setID_Number(e.target.value)}
                      required
                    />
                  </div>
                 
                  <div className={styles.password}>
                    <label htmlFor="pass">كلمة المرور</label>
                    <input
                      className={styles.input_field}
                      id="pass"
                      type="password"
                      name="passwordEmployee"
                      value={passwordEmployee}
                      onChange={(e)=>setPasswordEmployee(e.target.value)}
                      required
                    />
                  </div>
    

                  {/* /ForgetPasswordEmployee */}
                  <div className={styles.forget_password}>
                  <span>
                      Forgot you password?{" "}
                      <Link to="/ForgetPasswordEmployee"> Click here</Link>
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

       
       <footer>
         <div className={styles.copyright_area}>
          <p>جميع الحقوق محفوظة ©2025. نظام إدارة الشكاوي لبلدية عنبتا</p>
        </div>

       </footer>


    </Fragment>
  );
};

export default AdminLogin;
