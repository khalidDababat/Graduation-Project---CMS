
import AdminLogin from "./Components/AdminLogin/AdminLogin.jsx";
import ComplaintForm from './Components/CreateComplint/ComplaintForm.jsx';
import Home from "./Components/HomePage/Home.jsx";
import FooterPart from "./Components/FooterPart/FooterPart.jsx";

import ForgetPasswordAdmin from "./pages/ChangePasswordAdmin.jsx";
import ForgetPasswordEmployee from "./pages/ChangePasswordEmployee.jsx";
import ComplaintTrack from "./pages/ComplaintTrack.jsx";  
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx"; 
import EmployeePage from "./Components/EmployeePage/EmployeePage.jsx";
import ComplaintsManagement from "./Components/AdminDashboard/ComplaintsManagement.jsx";

import "./App.css"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    
       <Router>
         <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/create-complaint" element ={<ComplaintForm/>}/>
            <Route path="/loginAdmin" element ={<AdminLogin/>}/>
            <Route path="/ForgetPasswordAdmin" element ={<ForgetPasswordAdmin/>}/> 
            <Route path="/ForgetPasswordEmployee" element ={<ForgetPasswordEmployee/>}/>
            <Route path="/Complaint_Track" element ={<ComplaintTrack/>}/>
            <Route path="/AdminDashboard" element ={<AdminDashboard/>}/>
            <Route path="/ComplaintsManagement" element ={<ComplaintsManagement/>}/>
            <Route path="/EmployeePage" element={<EmployeePage/>}/>
         </Routes>
       </Router>
           
           
         

  );
}



export default App;
