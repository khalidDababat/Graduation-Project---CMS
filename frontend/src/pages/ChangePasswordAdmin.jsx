import React from 'react';
import styles from "./ChangePassword.module.css";

const ChangePasswordAdmin = () => {
  return (
    <div className='conteaner'>
           
       <form action="">

         <h2 className={styles.header_title}>خدمة استعادة كلمة السر</h2>

         <input type="text" 
                placeholder='Username' 
                value=""
                required />
          <input type="email"
                 placeholder='Email' 
                 value=""
                 required
                 />    
          <button type='submit'>إرسال </button>  
       </form>

    </div>
  )
}

export default ChangePasswordAdmin;
