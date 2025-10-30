import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/common/HomePage';
import Employer from './pages/employers/dashboard';
import MainLayout from './layouts/MainLayout';
import EmployerLayout from './layouts/EmployerLayout';
import PostJob from "./components/employers/postJobForm/PostJob"; // Renamed to follow PascalCase
import JobDetails from "./pages/common/JobDetails";
import AuthLayout from "./layouts/authLayout";
import Register from './pages/Register';
import Login from "./pages/login";
function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Main layout with nested route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="jobDetails/:id" element={<JobDetails />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* ✅ Employer layout with nested route */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<Employer />} />   {/* ✅ shows dashboard when only /employer */}
          <Route path="dashboard" element={<Employer />} />
          <Route path="post-job" element={<PostJob />} /> {/* Updated to post-job */}
          <Route path="home" element={<HomePage />} />
        </Route>

        {/* ✅ Login route placed correctly */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
