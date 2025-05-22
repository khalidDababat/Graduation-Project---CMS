import React from 'react';
import styles from "./ChangePassword.module.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';



const ComplaintTrack = () => {
  return (
    <div className={styles.complaint_track}>
          <h1>متابعة الشكوى </h1>
          <p>تتبع حالة الشكوى الخاصة بك</p>
          <form action="">
           <label htmlFor="">إدخل رقم الهوية</label> 
           <input type="text" required /> 
           {/* <label>رقم الهاتف</label>  
           <input type="text" required /> */}
         <button type="submit">متابعة الشكوى</button>
          
           <div className='alert alert-info mt-4' role='alert'>
             حالة شكواك لم تعمل بعد  
           </div>


          </form>      
    </div>
  )
}

export default ComplaintTrack;
