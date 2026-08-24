import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import { AuthProvider } from "./pages/auth/AuthContext";
// employer
import EmployerDashboard from './pages/employers/dashboard';

import PostJob from "./pages/employers/PostJob";
import CompanyProfile from './pages/employers/CompanyProfile';
import EmployerLayout from './layouts/EmployerLayout';
import ManageJobs from "./pages/employers/ManageJobs";
// jobseeker
import JobSeekerLayout from "./layouts/JobSeekerLayout";
import Dashboard from './pages/jobSeeker/Dashboard';

// Home
import MainLayout from './layouts/MainLayout';
import JobDetails from "./pages/home/JobDetails";
import LikedJobs from "./pages/home/LikedJobs";
import SavedJobs from "./pages/home/SavedJobs";
import FeaturedJobs from "./pages/home/FeaturedJobs";

// Auth
import Register1 from './pages/auth/Register';
import Login from "./pages/auth/login";
import ProtectedRoute from "./pages/auth/ProtectRoute";
// navigate
import { Navigate } from "react-router-dom";

// toast container
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function App() {
  return (

    <AuthProvider> {/* ADD THIS */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Router>
        <Routes>
          {/* Main layout with nested route */}

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="jobDetails/:id" element={<JobDetails />} />
            <Route path="likedJobs" element={<LikedJobs />} />
            <Route path="SavedJobs" element={<SavedJobs />} />
            <Route path="FeaturedJobs" element={<FeaturedJobs />} />
          </Route>

          {/* Jobseekerlayout */}
          <Route element={<JobSeekerLayout />}>
            <Route path="jobseeker" element={<Dashboard />} />
          </Route>

          {/* Auth layout for Register and Login pages */}
          <Route path="/register" element={<Register1 />} />
          <Route path="/login" element={<Login />} />



          {/* Employer layout with nested routes, protected for logged-in employers */}
          <Route element={<ProtectedRoute roles={['employer']} />}>
            <Route path="employer" element={<EmployerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<EmployerDashboard />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="company-profile" element={<CompanyProfile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider >
  );
}

export default App;