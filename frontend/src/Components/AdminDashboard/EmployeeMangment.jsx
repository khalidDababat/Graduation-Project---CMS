import React, { Fragment, useEffect, useState } from "react";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

  const [form, setForm] = useState({
    FullName: "",
    phone: "",
    ID_Number: "",
    password: "",
    email: "",
    department_id: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees/");
      if (!res.ok) throw new Error("Error fetching employees");
      const data = await res.json();
      // console.log("Fetched employees:", data);
      setEmployees(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function addOrUpdateEmployee() {
    try {
      if (editIndex !== null) {
        // Edite Employee
        const employeeId = employees[editIndex].id;
        const res = await fetch(
          `http://localhost:5000/api/employees/${employeeId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...form,
              admin_ID: 1,
              department_id: Number(form.department_id),
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to update employee");
        // alert("تم تعديل الموظف");

        setMessageSuccess("Employee updated successfully✔");
        setTimeout(() => {
          setMessageSuccess("");
          // setMessageError("");
        }, 2000);
      } else {
        // Add new Employee
        const res = await fetch("http://localhost:5000/api/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            admin_ID: 1,
            department_id: Number(form.department_id),
          }),
        });

        if (!res.ok) throw new Error("Failed to add employee");
        // alert("تمت إضافة الموظف");
        setMessageSuccess("The employee has been added successfully.");
        setTimeout(() => {
          setMessageSuccess("");
        }, 2000);
      }

      // Ubdate List Employees Tabel
      fetchEmployees();
    } catch (err) {
      console.error("Operation Error:", err);
      // alert("حدث خطأ أثناء العملية");
      setMessageError("Error!");
      setTimeout(() => {
        setMessageError("");
      }, 2000);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateEmployee();

    setForm({
      FullName: "",
      phone: "",
      ID_Number: "",
      password: "",
      email: "",
      department_id: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const emp = employees[index];
    setForm({
      fullName: emp.FullName,
      phone: emp.phone,
      idNumber: emp.ID_Number,
      // password: "",
      email: emp.email,
      department_id: emp.department_id.toString(),
    });
    // console.log(emp.FullName);
    // console.log(emp.ID_Number);

    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const employee = employees[index];
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا الموظف؟"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/employees/${employee.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete employee");

      // alert("تم حذف الموظف");
      setMessageError("The employee has been removed.");

      setTimeout(() => {
        setMessageError("");
      }, 2000);
      fetchEmployees();
    } catch (error) {
      console.error("Delete Error:", error);
      // alert("فشل في حذف الموظف");
      setMessageError("Feild Delete Employee!");
      setTimeout(() => {
        setMessageError("");
      }, 2000);
    }
  };

  const departments = [
    { id: 1, name: "الدائرة الهندسية" },
    { id: 2, name: "دائرة الشؤون الإدارية" },
    { id: 3, name: "دائرة الصحة والبيئة" },
  ];

  return (
    <Fragment>
      <header className={styles.header_Admin}>
        <div className="d-flex">
          <div className={styles.logo}>
            <img src={logo_image} className={styles.logoImage} alt="logo" />
          </div>
          <div className="d-inline ms-5 p-4">
            <h4>إدارة الموظفين</h4>
          </div>
        </div>

        <div className="d-flex">
          <form>
            <button type="button" className={styles.btn_user}>
              <FaUser size={25} />
              <span className="m-1">موظف</span>
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

        <div className="p-4 w-100 bg-light">
          <h5 className="mb-3">إضافة / تعديل موظف</h5>

          {messageSuccess && (
            <div className="alert alert-success text-center" role="alert">
              {messageSuccess}
            </div>
          )}
          {messageError && (
            <div className="alert alert-warning text-center" role="alert">
              {messageError}
            </div>
          )}

          <form onSubmit={handleSubmit} method="post" className="mb-4">
            <input
              type="text"
              name="fullName"
              placeholder="اسم الموظف"
              value={form.fullName}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <input
              type="text"
              name="phone"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <input
              type="text"
              name="idNumber"
              placeholder="رقم الهوية"
              value={form.idNumber}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />
            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              required
              className="form-control mb-2"
            >
              <option value="">اختر الدائرة</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={handleChange}
              required={!editIndex}
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-success">
              {editIndex !== null ? "تحديث الموظف" : "إضافة الموظف"}
            </button>
          </form>

          <h5>قائمة الموظفين</h5>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>الإسم</th>
                <th>رقم الهوية</th>
                <th>رقم الهاتف</th>
                <th>البريد الإلكتروني</th>
                <th>القسم</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.FullName}</td>
                  <td>{emp.ID_Number}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department_Name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm ms-2"
                      onClick={() => handleEdit(index)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="7">لا يوجد موظفين حالياً</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeManagement;
