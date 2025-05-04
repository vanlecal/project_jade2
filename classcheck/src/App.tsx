import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import LecturerLogin from "./pages/LecturerLogin";
import LecturerRegister from "./pages/LecturerRegister";
import LecturerDashboard from "./pages/LecturerDashboard";
import StudentDashbboard from "./pages/StudentDashboard";
import DashboardPage from "./TestRoom/lecturer/dashboard-page";
// import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LD" element={<DashboardPage />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/scan" element={<StudentDashbboard />} />
        <Route path="/lecturer/login" element={<LecturerLogin />} />
        <Route path="/lecturer/register" element={<LecturerRegister />} />
        <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
