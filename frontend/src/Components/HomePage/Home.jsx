import React, { Fragment ,useState} from "react";
import styles from "./Home.module.css";
// import FooterPart from "../FooterPart/FooterPart.jsx" 
import { Link } from "react-router-dom";
import ComplaintForm from '../../Components/CreateComplint/ComplaintForm.jsx';
import FooterPart from "../FooterPart/FooterPart.jsx";
import HeaderPart from "../HeaderPart/Header.jsx"; 
const Home = () => { 
  

  

  return (
    <Fragment>
      <div className={styles.home_container} id="home-container">
        
        
        <div>
           <HeaderPart/>
        </div>
        <div className={styles.home_content}>
          <h1>بلدية تستمع، تستجيب، وتطوّر</h1>
        </div>
      </div> 
       
        {/* <div id="create-complaint">
        <ComplaintForm/>
        </div> */}
       <div >
          <FooterPart/>
       </div>
     
       

    </Fragment>
  );
};

export default Home;
