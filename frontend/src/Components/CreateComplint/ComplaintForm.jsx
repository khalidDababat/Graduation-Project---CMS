import React, { Fragment } from "react";
import styles from "./ComplaintForm.module.css";
// import logo from "../../Assets/Logo-Image.jpg";
// import FooterPart from "../FooterPart/FooterPart.jsx";
// import { Link } from "react-router-dom";

const ComplaintForm = () => {
  return (
    <Fragment> 
      
      <div className={styles.conteaner}>
        {/* <div className={styles.header_submint}>
          <header>
            <div className={styles.info_Date_time}>
              <span>Date</span>
              <span>Time</span>
            </div>
            <div>
              <img src={logo} className={styles.logo_header} alt="not defind" />
            </div>

            <div className={styles.links_Citezen}>
              <Link to="/" className={styles.prev_Complint}>
                الصفحة الرئيسية
              </Link>
            </div>
          </header>
        </div> */}

        <div className={styles.complaint_Content}>
          <div className={styles.title_page}>
            <h1>إنشاء شكوى</h1>
          </div>

          <form action="">
            
            <label htmlFor="name">الإسم الكريم</label><br />
            <input type="text" required placeholder="Full Name" id="name" />
            
  
            <br />
            <label htmlFor="phone">رقم الهاتف المحمول </label><br />
            <input type="text" id="phone" placeholder="Phone number" />
            <br />
            <label htmlFor="">الايميل </label><br />
            <input required type="email" placeholder="Email" />

            <br />
            <label> رقم الهوية </label><br />
            <input type="text" required placeholder="Id Number" />

            <br />
            <label>الجهة المعنية</label><br />
            <select name="" id="">
              <option value="ًWater">مياه</option>
              <option value="electricity">كهرباء</option>
              <option value="public Works">أشغال عامة</option>
              <option value="Financial">مالية</option>
              <option value="Sewage">صرف صحي</option>
              <option value="Administrative">إدارية</option>
              <option value="Public Servise">أخرى</option>
            </select>
            <br />
            <label htmlFor="topic">موضوع الشكوى</label><br />
            <input
              type="text"
              name=""
              id="topic"
              placeholder="موضوع الشكوى"
              required
            />
            <br />

            <label htmlFor="topic">وصف الشكوى</label><br />
            <textarea
              name=""
              id=""
              rows={8}
              cols={55}
              placeholder="وصف الشكوى"
            ></textarea>
            <br />

            <label htmlFor="file">إدراج صورة</label><br />
            <input type="file" id="file" />
            <br />

            <button type="button">إرسال</button>
          </form>
        </div>
      </div>

      
    </Fragment>
  );
};

export default ComplaintForm;
