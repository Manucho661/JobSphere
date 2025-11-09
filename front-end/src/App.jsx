import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import { AuthProvider } from "./pages/auth/AuthContext";
// employer
import Employer from './pages/employers/dashboard';
import PostJob from "./pages/employers/PostJob";
import CompanyProfile from './pages/employers/CompanyProfile';
import EmployerLayout from './layouts/EmployerLayout';
// Home
import MainLayout from './layouts/MainLayout';
import JobDetails from "./pages/home/JobDetails";
import AuthLayout from "./layouts/AuthLayout";
// Auth
import Register from './pages/auth/Register';
import JobSeekerSignUp from "./pages/auth/JobSeekerSignUp";
import Login from "./pages/auth/login";
import ProtectedRoute from "./pages/auth/ProtectRoute";
// navigate
import { Navigate } from "react-router-dom";



function App() {
  return (
    <AuthProvider> {/* ADD THIS */}
      <Router>
        <Routes>
          {/* Main layout with nested route */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="jobDetails/:id" element={<JobDetails />} />
          </Route>

          {/* Auth layout for Register and Login pages */}
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/job-seeker-sign-up" element={<JobSeekerSignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Employer layout with nested routes, protected for logged-in employers */}
          <Route element={<ProtectedRoute roles={['employer']} />}>
            <Route path="employer" element={<EmployerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Employer />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="company-profile" element={<CompanyProfile />} />
              <Route path="home" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;