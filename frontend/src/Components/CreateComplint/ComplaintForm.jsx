import React, { Fragment, useState, useRef, useEffect } from "react";
import styles from "./ComplaintForm.module.css";
import FooterPart from "../FooterPart/FooterPart.jsx";
import HeaderPart from "../HeaderPart/Header.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuFileText } from "react-icons/lu";

import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const ComplaintForm = () => {
  const [messageSuccess, setmessageSuccess] = useState("");

  const [PhoneError, setPhoneError] = useState("");
  const [messageError, setmessageError] = useState("");
  const [IDError, setIDError] = useState("");
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

    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      console.log("Word count:", wordCount);
      if (wordCount > 100) {
        setmessageError("لا يمكن إرسال الشكوى لأن وصفها يتجاوز 100 كلمة.");
      } else if (wordCount < 5) {
        setmessageError(
          "لا يمكن إرسال الشكوى لأن وصفها يجب أن يكون أكثر من 5 كلمات."
        );
      } else {
        setmessageError("");
      }
    }

    if (name === "ID_number") {
      const idRegex = /^\d{9}$/;
      if (!idRegex.test(value)) {
        setIDError("رقم الهوية يجب أن يتكون من 9 أرقام فقط.");
      } else {
        setIDError("");
      }
    }

    if (files) {
      // console.log("Uploaded files:", files);
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone) {
      toast.error("رقم الهاتف مطلوب.");
      return;
    }

    // const phoneRegex = /^9705[6-9]\d{7}$/;
    // if (!phoneRegex.test(formData.phone)) {
    //   setPhoneError("رقم الهاتف غير صحيح. الرجاء إدخال رقم جوال  صالح.");
    //   return;
    // } else {
    //   setPhoneError("");
    // }

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

    try {
      const confermSubmit = window.confirm("هل أنت متأكد من إرسال الشكوى؟");
      if (!confermSubmit) {
        toast.info("تم إلغاء إرسال الشكوى.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/complaints/submit", {
        method: "POST",
        body: data,
      });
      // const Result =await res.json();
      // console.log("The result ",Result);

      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();

        toast.success("تم إرسال الشكوى ،سيتم معالجة الشكوى من قبل البلدية .");
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
      toast.error("حدث خطأ اثناء إرسال الشكوى ");
    }
  };

  return (
    <Fragment>
      <ToastContainer position="bottom-right" autoClose={7000} />

      <div className="mb-4">
        <HeaderPart />
      </div>

      <div className={styles.conteaner}>
        <div className={styles.complaint_Content}>
          <div className={styles.title_page}>
            <h2>
              {" "}
              <span>{<LuFileText />} إنشاء شكوى</span>
            </h2>
            <p className="text-muted">
              يرجى تعبئة جميع الحقول المطلوبة لضمان سرعة معالجة الشكوى
            </p>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">الإسم الكريم</label>
            <br />
            <input
              type="text"
              placeholder="الإسم الكامل "
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />

            <br />

            <label htmlFor="phone">
              رقم الهاتف المحمول <span className={styles.requiredStar}>*</span>
            </label>
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
            <span className={styles.requiredStar}>{PhoneError}</span>

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
            <label>
              {" "}
              رقم الهوية
              <span className={styles.requiredStar}>*</span>
            </label>
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
            <span className={styles.requiredStar}>{IDError}</span>

            <br />
            <label>
              الجهة المعنية
              <span className={styles.requiredStar}>*</span>
            </label>
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
            <label htmlFor="topic">
              موضوع الشكوى
              <span className={styles.requiredStar}>*</span>
            </label>
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

            <label htmlFor="topic">
              وصف الشكوى
              <span className={styles.requiredStar}>*</span>
            </label>
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

            <span className={styles.requiredStar}>{messageError}</span>

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
            <p className="text-sm text-muted mt-0">
              يمكنك رفع الصور والفيديوهات
            </p>
            <button type="submit">إرسال</button>
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
