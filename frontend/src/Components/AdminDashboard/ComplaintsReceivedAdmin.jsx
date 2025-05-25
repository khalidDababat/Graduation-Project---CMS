import React, { Fragment } from "react";
import styles from "./AdminDashboard.module.css";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaBars, FaUser, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/PrivateRoutes";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const ComplaintsReceivedAdmin = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handelLogout = () => {
    logOut();
    navigate("/loginAdmin");
  };

  return (
    <Fragment>
     {/* <header className={styles.header_Admin}>
             <div className="d-flex">
               <div className={styles.logo}>
                 <img src={logo_image} className={styles.logoImage} alt="logo" />
               </div>
               <h4 className="mt-4">لوحة تحكم المسؤول - بلدية عنبتا</h4>
             </div>
     
             <div className="d-flex ">
               <form action="">
                 <button type="button" className={styles.btn_user} id="btn_user">
                   <FaUser size={25} />
                   <span className="m-1">{user?.username}</span>
                 </button>
               </form>
             </div>
           </header> */}
             
        <div>
          <HeaderAdmin/>
        </div>

      <div className={styles.conteant_page}>
        <div>
          <div className={styles.side_lists}>
            <ul>
              <li>
                <Link to="/AdminDashboard">قائمة الشكاوي </Link>
              </li>
              <li>
                <Link to="/EmployeeMangment">إدارة الموظفين</Link>
              </li>
              <li>
                <Link to="/ComplaintsIssuedAdmin">الشكاوي الصادرة</Link>
                <span className={styles.notify_complaint}>0</span>
              </li>
              <li>
                <Link to="/ComplaintsReceivedAdmin">الشكاوي الواردة </Link>
                <span className={styles.notify_complaint}>0</span>
              </li>
              {/* <li>
                <Link to="">تغيير كلمة السر</Link>
              </li> */}
              <li>
                <button
                  onClick={handelLogout}
                  className="btn btn-danger w-100 mt-2"
                >
                  تسجيل الخروج
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ......... */}

        <div className="bg-light">
          <h2>إدارة الشكاوي </h2>
        </div>
      </div>
    </Fragment>
  );
};

export default ComplaintsReceivedAdmin;
