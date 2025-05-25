import React, { Fragment, useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import logo_image from "../../Assets/Logo_image.jpg";
import { FaBars, FaUser, FaBell, FaImage, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/PrivateRoutes";

import HeaderAdmin from "./HeaderAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handelLogout = () => {
    logOut();
    navigate("/loginAdmin");
  };


  const [complaints, setComplaints] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

   
  useEffect( () =>{
        
    const fetchComplaint = async() =>{
       
      try{
          
        const res = await fetch("http://localhost:5000/api/admin/viewComplaintInfo");
        


        if (!res.ok) {
          console.error("HTTP error", res.status);
          return;
        }
        const data = await res.json(); 

        
        
       const setOFComplaints =data.complaints || data.data; 
       if(Array.isArray(setOFComplaints)){
        setComplaints(setOFComplaints);
       }else{
        console.log("لا يوجد شكاوي متقدمه ");
        setComplaints([]);
       }



      }catch(error){
          console.log(error);
      }


    };
     
    fetchComplaint(); 
  },[])




  const filteredComplaints = complaints.filter((c) => {
    if (!startDate || !endDate) return true;
    const complaintDate = new Date(c.created_at);
    return (
      complaintDate >= new Date(startDate) && complaintDate <= new Date(endDate)
    );
  });
 

  const openComplaintDetails = (id) => {
    navigate(`/editComplaint/${id}`);
  };

  return (
    <Fragment>
      {/* <header className={styles.header_Admin}>
        <div className="d-flex">
          <div className={styles.logo}>
            <img src={logo_image} className={styles.logoImage} alt="logo" />
          </div>
          <h4 className="mt-4">لوحة تحكم المسؤول - بلدية عنبتا</h4>
        </div>

        <div className="d-flex ">
          <form action="">
            <button type="button" className={styles.btn_user} id="btn_user">
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
                <Link to="/ChangePassword">تغيير كلمة السر</Link>
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

        {/* secound Coulmn  */}

        {/* <div className="bg-light">
          <div className={styles.DashBourd}>
            <div>
              <p>إجمالي الشكاوي</p>
              <span>0</span>
            </div>

            <div>
              <p>الشكاوي النشطة</p>
              <span>0</span>
            </div>
          </div>

          <br />
          <div className={styles.search_Complint}>
            <form action="">
              <input
                type="search"
                name=""
                placeholder="بحث عن الشكوى حسب إسم الموظف، موضوع الشكوى ،الوصف "
                className=""
              />
            </form>
          </div>
        </div> */}

        <div className="bg-light w-100 p-3">
          <div className="d-flex gap-3 align-items-center">
            <label>من:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>إلى:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="btn btn-primary">فلترة</button>

            
          </div>

          <div className="row mt-4 ">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="col-md-6 col-lg-4 mb-4">
                <div
                  className="card shadow-sm h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => openComplaintDetails(complaint.id)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{complaint.title}</h5>
                    <p className="card-text text-muted">
                      {complaint.description.slice(0, 50)}...
                    </p>
                    <p>
                      <strong>الموظف:</strong>{" "}
                      {complaint.employee || "غير مسند"}
                    </p>
                    <p>
                      <strong>الدائرة:</strong> {complaint.department_id}
                    </p>
                    <p>
                      <strong> تاريخ الإنشاء</strong>{" "} 
                      { new Date(complaint.created_at).toISOString().split("T")[0]}
                      
                    </p>
                    <p>
                      <strong>الحالة:</strong>{" "}
                      <span className="badge bg-info">{complaint.status}</span>
                    </p>
                    {complaint.image_path && (
                      <button className="btn btn-sm btn-outline-secondary mt-2">
                        <FaImage /> عرض الصورة
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredComplaints.length === 0 && (
            <p className="text-center mt-5">
              لا توجد شكاوى في هذا النطاق الزمني
            </p>
          )}
        </div>
      </div>

      <footer></footer>
    </Fragment>
  );
};

export default AdminDashboard;
