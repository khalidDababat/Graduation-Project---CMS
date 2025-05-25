import React, { Fragment, useState, useRef, useEffect } from "react";
import styles from "./ComplaintForm.module.css";
import FooterPart from "../FooterPart/FooterPart.jsx";
import HeaderPart from "../HeaderPart/Header.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// import logo from "../../Assets/Logo-Image.jpg";
// import FooterPart from "../FooterPart/FooterPart.jsx";
// import { Link } from "react-router-dom";

const ComplaintForm = () => {
  const [messageSuccess, setmessageSuccess] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    ID_number: "",
    department_id: "",
    title: "",
    description: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // console.log("Uploaded files:", files);
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // console.log("hhhhhhhhhhhhh", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || formData.phone.trim() === "") {
      alert("يرجى إدخال رقم الهاتف");
      return;
    }

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("ID_number", formData.ID_number);
    data.append("department_id", formData.department_id);
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((fileItem) => {
        data.append("attachments", fileItem);
      });
    }

    // can send formData to your backend API

    try {
      const res = await fetch("http://localhost:5000/api/complaints/submit", {
        method: "post",
        body: data,
      });
      // const Result =await res.json();
      // console.log("The result ",Result);

      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();
        // console.log("The result", result);
        setmessageSuccess(
          "شكرًا لمراسلتنا. سيتم معالجة شكواك من قبل البلدية في أقرب وقت ممكن"
        );
        setTimeout(() => {
          setmessageSuccess("");
        }, 5000);
      }
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        ID_number: "",
        department_id: "",
        title: "",
        description: "",
        files: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* <div className={styles.home_header}>
          <h4 className={styles.header_logo}>إدارة الشكاوي</h4>
          <div className={styles.action}>
            <Link to="/">الصفحة الرئيسية</Link>
          </div>
        </div> */}
      <div className="mb-4">
        <HeaderPart />
      </div>

      <div className={styles.conteaner}>
        <div className={styles.complaint_Content}>
          <div className={styles.title_page}>
            <h1>إنشاء شكوى</h1>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">الإسم الكريم</label>
            <br />
            <input
              type="text"
              required
              placeholder="الإسم الكامل "
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />

            <br />

            <label htmlFor="phone">رقم الهاتف المحمول </label>
            <br />
            {/* <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            /> */}

            <PhoneInput
              className=""
              value={formData.phone}
              country="ps"
              onlyCountries={["ps", "il"]}
              preferredCountries={["ps", "il"]}
              enableAreaCodes={true}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              onChange={(phone) => setFormData({ ...formData, phone })}
              containerStyle={{
                marginTop: "10px",
                direction: "ltr",
              }}
              inputStyle={{
                fontSize: "18px",
                height: "50px",
              }}
            />

            <br />
            <label htmlFor="">الايميل </label>
            <br />
            <input
              type="email"
              placeholder="Email إختياري"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <br />
            <label> رقم الهوية </label>
            <br />
            <input
              type="text"
              required
              placeholder="رقم الهوية"
              name="ID_number"
              value={formData.ID_number}
              onChange={handleChange}
            />

            <br />
            <label>الجهة المعنية</label>
            <br />
            <select
              name="department_id"
              required
              value={formData.department_id}
              onChange={handleChange}
            >
              <option value="">-- اختر الجهة --</option>
              <option value="1">دائرة الهندسية</option>
              <option value="2">دائرة الشؤون الإدارية</option>
              <option value="3">دائرة الصحة والبيئة</option>
            </select>
            <br />
            <label htmlFor="topic">موضوع الشكوى</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="موضوع الشكوى"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <br />

            <label htmlFor="topic">وصف الشكوى</label>
            <br />
            <textarea
              name="description"
              rows={8}
              cols={55}
              placeholder="وصف الشكوى"
              className="resize-both"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <br />

            <label htmlFor="file">إدراج صورة</label>
            <br />
            <input
              type="file"
              accept="image/* ,video/*"
              id="file"
              name="files"
              multiple
              onChange={handleChange}
            />
            <br />

            <button type="submit">إرسال</button>
            {messageSuccess && (
              <div
                class="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <BsCheckCircleFill className="me-2 text-success" size={24} />
                <div className="fs-4">{messageSuccess}</div>
              </div>
            )}
          </form>
        </div>
      </div>

      <div>
        <FooterPart />
      </div>
    </Fragment>
  );
};

export default ComplaintForm;
