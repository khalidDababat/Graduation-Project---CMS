import React from 'react';
import styles from "./ChangePassword.module.css";


const ChangePasswordEmployee = () => {
  return (
    <div className='conteaner'>
           
       <form action="">

         <h2 className={styles.header_title}>خدمة استعادة كلمة السر</h2>

         <input type="text" 
                placeholder='إسم الموظف' 
                value=""
                required />
          <input type="text"
                 placeholder='رقم الهوية' 
                 value=""
                 required
                 />  
          <input type="text"
                 placeholder='رقم الهاتف' 
                 value=""
                 required
                 />      
          <button type='submit'>إرسال الطلب</button>  
       </form>

    </div>
  )
}

export default ChangePasswordEmployee;
