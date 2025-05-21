import React, { Fragment } from "react";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaBars, FaUser, FaBell } from "react-icons/fa";
import styles from "./EmployeePage.module.css";

const EmployeePage = () => {
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
            <span className="bg-danger" id="">
              0
            </span>
          </button>

          <form action="">
            <button type="button" className={styles.btn_user} id="btn_user">
              <FaUser size={25} />
              <span className="m-1">اسم الموظف </span>
            </button>
          </form>
        </div>
      </header>

     


      
    </Fragment>
  );
};

export default EmployeePage;
