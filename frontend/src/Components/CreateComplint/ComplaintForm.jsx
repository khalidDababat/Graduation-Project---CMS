import React, { Fragment, useState } from "react";
import styles from "./ComplaintForm.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// import logo from "../../Assets/Logo-Image.jpg";
// import FooterPart from "../FooterPart/FooterPart.jsx";
// import { Link } from "react-router-dom";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    idNumber: "",
    department: "",
    topic: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("idNumber", formData.idNumber);
    data.append("department", formData.department);
    data.append("topic", formData.topic);
    data.append("description", formData.description);
    if (formData.file) {
      data.append("file", formData.file);
    }

    // Here you can send formData to your backend API

    console.log("The Data is ", formData);
  };



  
  return (
    <Fragment>
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
              name="name"
              value={formData.name}
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
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
            />

            <br />
            <label>الجهة المعنية</label>
            <br />
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
            >
              <option value="ًengineringDepartment">دائرة الهندسية</option>
              <option value="administrativeStuff">دائرة الشؤون الإدارية</option>
              <option value="environment">دائرة الصحة والبيئة</option>
            </select>
            <br />
            <label htmlFor="topic">موضوع الشكوى</label>
            <br />
            <input
              type="text"
              name="topic"
              placeholder="موضوع الشكوى"
              required
              value={formData.topic}
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
              name="file"
              multiple
              onChange={handleChange}
            />
            <br />

            <button type="submit">إرسال</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ComplaintForm;
