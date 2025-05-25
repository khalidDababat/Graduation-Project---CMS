import React, { Fragment } from "react";
import styles from "./ChangePassword.module.css";
import FooterPart  from "../Components/FooterPart/FooterPart.jsx";
import HeaderPart from "../Components/HeaderPart/Header.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

const ComplaintTrack = () => {
  return (
    <Fragment>
      {/* <div className={styles.home_header}>
        <h4 className={styles.header_logo}>إدارة الشكاوي</h4>
        <div className={styles.action}>
          <Link to="/">الصفحة الرئيسية</Link>
        </div>
      </div> */}
          
          <div className="mb-4">
           <HeaderPart/>
        </div>


      <div className={styles.complaint_track}>
        <h1>متابعة الشكوى </h1>
        <p>تتبع حالة الشكوى الخاصة بك</p>
        <form action="">
          <label htmlFor="">إدخل رقم الهوية</label>
          <input type="text" required />
          {/* <label>رقم الهاتف</label>  
           <input type="text" required /> */}
          <button type="submit">متابعة الشكوى</button>

          <div className="alert alert-info mt-4" role="alert">
            حالة شكواك لم تعمل بعد
          </div>
        </form>
      </div>

             <div >
                <FooterPart/>
             </div>
    </Fragment>
  );
};

export default ComplaintTrack;
