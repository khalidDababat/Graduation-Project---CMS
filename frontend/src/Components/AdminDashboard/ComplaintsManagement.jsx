import React, { Fragment } from 'react'; 
import styles from './AdminDashboard.module.css';
import logo_image from "../../Assets/Logo_image.jpg";
import { FaBars, FaUser, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom'; 

const ComplaintsManagement = () => {
  
  
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
            <ul>
              <li>
                <Link to="/AdminDashboard">قائمة الشكاوي </Link>
              </li>
              <li>
                <Link to="">الشكاوي الصادرة</Link>
                <span className={styles.notify_complaint}>0</span>
              </li>
              <li>
                <Link to="">الشكاوي الواردة </Link>
                <span className={styles.notify_complaint}>0</span>
              </li>
              <li>
                <Link to="">تغيير كلمة السر</Link>
              </li>
              <li>
                <Link>تسجيل الخروج</Link>
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



  )
}

export default ComplaintsManagement;
