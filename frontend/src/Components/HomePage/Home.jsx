import React, { Fragment ,useState} from "react";
import styles from "./Home.module.css";
// import FooterPart from "../FooterPart/FooterPart.jsx" 
import { Link } from "react-router-dom";
import ComplaintForm from '../../Components/CreateComplint/ComplaintForm.jsx';
import FooterPart from "../FooterPart/FooterPart.jsx";

const Home = () => { 
  

  

  return (
    <Fragment>
      <div className={styles.home_container} id="home-container">
        <div className={styles.home_header}>
         
          <div className={styles.action}>
            {/* <Link to="/create-complaint">تقديم شكوى</Link> */}
            <a href="#create-complaint">تقديم شكوى</a>
            <Link to="/Complaint_Track" >متابعة شكوى مسبقا</Link>
          </div> 
          
          <h4 className={styles.header_logo}>إدارة الشكاوي</h4>
        </div>

        <div className={styles.home_content}>
          <h1>بلدية تستمع، تستجيب، وتطوّر</h1>
        </div>
      </div> 
       
        <div id="create-complaint">
        <ComplaintForm/>
        </div>
       <div id="contactPage">
          <FooterPart/>
       </div>
     
       

    </Fragment>
  );
};

export default Home;
