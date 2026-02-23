import Header from "../components/home/Header";
import Sidebar from "../components/employers/Sidebar";
import Footer from "../components/home/Footer";
import "./jobseeker.css";
import { Outlet } from "react-router-dom"; // ✅ Must import this!

const EmployerLayout = () => {
  return (
    <div className="jobSeeker-app-wrapper">
      <Header />
      <Sidebar />
      <div className="jobseekerMain">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default EmployerLayout;
