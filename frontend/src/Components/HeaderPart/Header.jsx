import React from 'react';
import styles from "./Header.module.css"; 
import { Link } from 'react-router-dom';
// import ComplaintForm from '../CreateComplint/ComplaintForm.jsx'; 


const Header = () => {
  return (
    
     <div className={styles.home_header}>
             <h4 className={styles.header_logo}>إدارة الشكاوي</h4>
             <div className={styles.action}>
               <Link to="/">الصفحة الرئيسية</Link>
               <Link to="/create-complaint">تقديم شكوى</Link>
               <Link to="/Complaint_Track">متابعة شكوى مسبقا</Link>
             </div>
           </div>


  )
}

export default Header
