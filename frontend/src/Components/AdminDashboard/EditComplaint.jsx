import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import { useAuth } from "../../utils/PrivateRoutes";
import styles from "./AdminDashboard.module.css";

const EditComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [status, setStatus] = useState("");

  const { user, logOut } = useAuth();

  const handelLogout = () => {
    logOut();
    navigate("/loginAdmin");
  };

  useEffect(() => {
    // Fetch complaint details
    fetch(`http://localhost:5000/api/admin/complaint/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaint(data[0]);
        setSelectedDept(data[0].department_name);
        setSelectedEmployee("");
        setStatus(data[0].status);
      });

    // Fetch departments
    fetch("http://localhost:5000/api/admin/dropdown-data")
      .then((res) => res.json())
      .then((data) => setDepartments(data.departments));

    // Fetch employees
    fetch("http://localhost:5000/api/employees/")
      .then((res) => res.json())
      .then((data) => {
        //console.log("Employees fetched:", data);
        setEmployees(data);
      });

     //Fetch Citezens Info 



  }, [id]);

  if (!complaint) {
    return <div className="container mt-4">جارٍ تحميل البيانات...</div>;
  }

  return (
    <Fragment>
      <div>
        <HeaderAdmin />
      </div>

      <div className={`containe ${styles.main_conteaner}`}>
        <div className={styles.side_lists}>
          <ul>
            <li>
              <Link to="/AdminDashboard">قائمة الشكاوي</Link>
            </li>
            <li>
              <Link to="/EmployeeMangment">إدارة الموظفين</Link>
            </li>
            <li>
              <Link to="/ComplaintsIssuedAdmin">
                الشكاوي الصادرة{" "}
                <span className={styles.notify_complaint}>0</span>
              </Link>
            </li>
            <li>
              <Link to="/ComplaintsReceivedAdmin">
                الشكاوي الواردة{" "}
                <span className={styles.notify_complaint}>0</span>
              </Link>
            </li>
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

        <div className="content m-4 ">
          <h2>تفاصيل الشكوى</h2>

          <div className="mb-3">
            <label>الموضوع:</label>
            <input
              className="form-control"
              value={complaint.title || ""}
              disabled
            />
          </div>

          <div className="mb-3">
            <label>نص الشكوى:</label>
            <textarea
              className="form-control"
              value={complaint.description || ""}
              disabled
            />
          </div>

          <div className="mb-3">
            <label>اسم المواطن:</label>
            <input className="form-control" value="" name="name" disabled />
          </div>

          <div className="mb-3">
            <label>رقم الجوال:</label>
            <input className="form-control" value="" name="phone" disabled />
          </div>

          <div className="mb-3">
            <label>البريد الإلكتروني:</label>
            <input className="form-control" value="غير مدخل " disabled />
          </div>

          <div className="mb-3">
            <label>رقم الهوية:</label>
            <input className="form-control" value="" disabled />
          </div>

          <div className="mb-3">
            <label>الدائرة:</label>
            <select
              className="form-control"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>الموظف :</label>
            <select
              className="form-control"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">غير مسند</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.FullName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>الحالة:</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="جديدة">جديدة</option>
              <option value="قيد المعالجة">قيد المعالجة</option>
              <option value="تمت المعالجة">تمت المعالجة</option>
              <option value="مغلقة">مغلقة</option>
            </select>
          </div>

          {complaint.image_path && (
            <div className="mb-3">
              <a
                href={`http://localhost:5000/${complaint.image_path}`}
                rel="noopener noreferrer"
                className="btn btn-outline-secondary"
              >
                عرض الصورة
              </a>
            </div>
          )}

          <button className="btn btn-success">تحديث الشكوى</button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditComplaint;
