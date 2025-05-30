import React, { Fragment, useEffect, useState } from "react";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { useAuth } from "../../utils/PrivateRoutes";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    idNumber: "",
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
        // console.log("theeeeee", res);
        if (!res.ok) throw new Error("Failed to update employee");

        setMessageSuccess("تم تحديث بيانات الموظف ");
        setTimeout(() => setMessageSuccess(""), 2000);
      } else {
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

        // setMessageSuccess("The employee has been added successfully.");
        setMessageSuccess("تم إضافة الموظف ");
        setTimeout(() => setMessageSuccess(""), 2000);
      }

      fetchEmployees();
    } catch (err) {
      console.error("Operation Error:", err);
      setMessageError("Error!");
      setTimeout(() => setMessageError(""), 2000);
    }
  }

  const handelLogout = () => {
    logOut();
    navigate("/loginAdmin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateEmployee();

    setForm({
      fullName: "",
      phone: "",
      idNumber: "",
      password: "",
      email: "",
      department_id: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const emp = employees[index];
    console.log("the employee Edited ", emp);
    setForm({
      fullName: emp.FullName,
      phone: emp.phone,
      idNumber: emp.ID_Number,
      // password: "",
      email: emp.email,
      department_id: emp.department_id.toString(),
    });
    console.log("emp.department_id ", form);
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
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete employee");

      setMessageError("تم حذف الموظف ");
      setTimeout(() => setMessageError(""), 2000);
      fetchEmployees();
    } catch (error) {
      console.error("Delete Error:", error);
      setMessageError("Failed to delete employee!");
      setTimeout(() => setMessageError(""), 2000);
    }
  };

  const departments = [
    { id: 1, name: "الدائرة الهندسية" },
    { id: 2, name: "دائرة الشؤون الإدارية" },
    { id: 3, name: "دائرة الصحة والبيئة" },
  ];

  return (
    <Fragment>
      {/* <header className={styles.header_Admin}>
        <div className="d-flex">
          <div className={styles.logo}>
            <img src={logo_image} className={styles.logoImage} alt="logo" />
          </div>
          <div className="d-inline ms-5 p-4">
            <h4 className="mt-1">لوحة تحكم المسؤول - بلدية عنبتا</h4>
          </div>
        </div>

        <div className="d-flex">
          <form>
            <button type="button" className={styles.btn_user}>
              <FaUser size={25} />
              <span className="m-1">{user?.username}</span>
            </button>
          </form>
        </div>
      </header> */}

      <div>
        <HeaderAdmin />
      </div>

      <div className={styles.conteant_page}>
        <div>
          <div className={styles.side_lists}>
            <ul>
              <li>
                <Link to="/AdminDashboard">قائمة الشكاوي </Link>
              </li>
              <li>
                <Link to="/EmployeeMangment">إدارة الموظفين</Link>
              </li>
              <li>
                <Link to="/ComplaintsIssuedAdmin">الشكاوي الصادرة</Link>
                <span className={styles.notify_complaint}>0</span>
              </li>
              <li>
                <Link to="/ComplaintsReceivedAdmin">الشكاوي الواردة </Link>
                <span className={styles.notify_complaint}>0</span>
              </li>
              {/* <li>
                <Link to="">تغيير كلمة السر</Link>
              </li> */}
              <li>
                <button
                  onClick={handelLogout}
                  className="btn btn-danger w-100 mt-2"
                >
                  تسجيل الخروج
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 w-100 bg-light">
          <h5 className="mb-3">إضافة / تعديل موظف</h5>

          <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="fullName">اسم الموظف</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <label htmlFor="phone">رقم الهاتف</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <label htmlFor="idNumber">رقم الهوية</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />

            <label htmlFor="department_id">اختر الدائرة</label>
            <select
              id="department_id"
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              required
              className="form-control mb-2"
            >
              <option value="">-- اختر الدائرة --</option>
              {departments.map((dept) => (
                <option value={dept.id}>{dept.name}</option>
              ))}
            </select>

            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <div className="d-flex gap-2">
              {editIndex === null ? (
                <button type="submit" className="btn btn-success">
                  إضافة الموظف
                </button>
              ) : (
                <>
                  <button type="submit" className="btn btn-primary">
                    تحديث الموظف
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditIndex(null);
                      setForm({
                        fullName: "",
                        phone: "",
                        idNumber: "",
                        password: "",
                        email: "",
                        department_id: "",
                      });
                    }}
                  >
                    إلغاء التعديل
                  </button>
                </>
              )}
            </div>
          </form>

          {messageSuccess && (
            <div
              className=" alert alert-success  text-center fs-4"
              role="alert"
            >
              {messageSuccess}
            </div>
          )}
          {messageError && (
            <div className=" alert alert-warning text-center fs-4" role="alert">
              {messageError}
            </div>
          )}

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
