import React, { Fragment } from "react";
import styles from "./AdminDashboard.module.css";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaBars, FaUser, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {








  return (
    <Fragment>
      
        <header className={styles.header_Admin}>
          <div className="d-flex">
            <div className={styles.logo}>
              <img src={logo_image} className={styles.logoImage} alt="logo" />
            </div>
            <button className={styles.navbar_toggler} type="button">
              <FaBars size={24} />
            </button>
          </div>

          <div className="d-flex ">
            <button className={styles.btn_bell} type="button">
              <FaBell size={25} />
              <span className="bg-danger">0</span>
            </button>

            <form action="">
              <button type="button" className={styles.btn_user} id="btn_user">
                <FaUser size={25} />
                <span className="m-1">Admin</span>
              </button>
            </form>
          </div>
        </header>

        <div className={styles.conteant_page}>
          <div>
            <div className={styles.side_lists}>

                <form action="">
                <ul>
                <li>
                  <Link to='/AdminDashboard'>الصفحة الرئيسية</Link>
                </li>
                <li>
                  <Link >إدارة الموظفين</Link>
                </li>
                <li>
                  <Link to="/ComplaintsManagement">إدارة الشكاوي</Link>
                </li>
                <li>
                  <Link > الملف الشخصي</Link>
                </li>
                <li>
                  <Link >تسجيل الخروج</Link>
                </li>
              </ul>

                </form>
              
            </div>
          </div>

          {/* secound Coulmn  */}
        
           
          <div className="bg-light">
            

            <h2>لوحة تحكم المسؤول - بلدية عنبتا</h2>
            <div className={styles.DashBourd}>
              <div>
                <p>اجمالي المواطنين</p>
                <span>0</span>
              </div>
              <div>
                <p>اجمالي الشكاوي</p>
                <span>0</span>
              </div>
              <div>
                <p>الشكاوي النشطة</p>
                <span>0</span>
              </div>
          </div>

          <br />
          <div className={styles.search_Complint}>

          <form action="">
            <input
              type="search"
              name=""
              placeholder="بحث عن الشكوى حسب إسم الموظف، موضوع الشكوى ،الوصف "
              className=""
           />


          </form>


            
          </div>
          
         
            








        </div>

  
        



      </div>
    </Fragment>
  );
};

export default AdminDashboard;
