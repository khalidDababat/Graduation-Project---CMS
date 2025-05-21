import React from "react";
import face from "../../Assets/bxl-facebook-circle.svg";
import insta from "../../Assets/bxl-instagram.svg";
import youtup from "../../Assets/bxl-youtube.svg";
import styles from "./FooterPart.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container_footer}>
        <div className={styles.footer_item}>
          <div className={styles.text_footer}>
            <p>
              يتطلع نظام إدارة الشكاوى لبلدية عنبتا إلى تقديم خدمة بلدية
              إلكترونية فعالة، تضمن سرعة الاستجابة، ورفع جودة المتابعة، وتعزيز
              الشفافية في معالجة الشكاوى.
            </p>
          </div>

          <div className={styles.social_icons}>
            <h3>تواصل معنا </h3>
            <ul>
              <li>
                <a href="#">
                  <img src={youtup} alt="YouTube" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={insta} alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={face} alt="Facebook" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Link className={styles.logInEmoloyees} to="/loginAdmin">
              تسجيل دخول الموظفين
            </Link>
          </div>
        </div>

        <div className={styles.copyright_area}>
          <p>جميع الحقوق محفوظة ©2025. نظام إدارة الشكاوي لبلدية عنبتا</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
