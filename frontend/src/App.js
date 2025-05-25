import AdminLogin from "./Components/AdminLogin/AdminLogin.jsx";
import ComplaintForm from "./Components/CreateComplint/ComplaintForm.jsx";
import Home from "./Components/HomePage/Home.jsx";
import ComplaintTrack from "./pages/ComplaintTrack.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import EmployeePage from "./Components/EmployeePage/EmployeePage.jsx";
import EmployeeMangment from "./Components/AdminDashboard/EmployeeMangment.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./utils/PrivateRoutes.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { EmployeeProvider } from "./utils/EmployeeContext.js";

import ForgetPassword from "./pages/ForgotePassword.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

import FooterPart from "./Components/FooterPart/FooterPart.jsx";
import HeaderPart from "./Components/HeaderPart/Header.jsx";

import ComplaintsIssuedAdmin from "./Components/AdminDashboard/ComplaintsIssuedAdmin.jsx";
import ComplaintsReceivedAdmin from "./Components/AdminDashboard/ComplaintsReceivedAdmin.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-complaint" element={<ComplaintForm />} />
          <Route path="/loginAdmin" element={<AdminLogin />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Complaint_Track" element={<ComplaintTrack />} />

          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ComplaintsIssuedAdmin"
            element={
              <ProtectedRoute>
                <ComplaintsIssuedAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ComplaintsReceivedAdmin"
            element={
              <ProtectedRoute>
                <ComplaintsReceivedAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ChangePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/EmployeePage"
            element={
              <ProtectedRoute>
                <EmployeeProvider>
                  <EmployeePage />
                </EmployeeProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeeMangment"
            element={
              <ProtectedRoute>
                <EmployeeProvider>
                  <EmployeeMangment />
                </EmployeeProvider>
              </ProtectedRoute>
            }
          />

          <Route path="/HeaderPart" element={<HeaderPart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
