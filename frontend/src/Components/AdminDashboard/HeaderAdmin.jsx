import React from "react";
import styles from "./AdminDashboard.module.css";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaBars, FaUser, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

import AdminSettings  from "./AdminSettings.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/PrivateRoutes";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

 

  const handleChangeSetings = () => {
   
    navigate("/AdminSettings"); 

  };



  return (
    <header className={styles.header_Admin}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <div className={styles.logo}>
            <img src={logo_image} className={styles.logoImage} alt="logo" />
          </div>
          <div className="ms-5 p-4">
            <h4 className="mt-1">لوحة تحكم المسؤول - بلدية عنبتا</h4>
          </div>
        </div>

        {/* قائمة المستخدم */}
        <div className="dropdown me-4 ">
          <button
            className={`btn dropdown-toggle fw-bold ${styles.btn_user}`}
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUser size={20} />
            <span className="ms-2">{user?.username}</span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item" onClick={handleChangeSetings}>
                تغيير اعدادات النظام
              </button>
            </li>
            {/* <li>
              <button className="dropdown-item" onClick={handleChangePassword}>
                تغيير كلمة المرور
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
