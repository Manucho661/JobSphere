import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import JobDetails from "./pages/JobDetails";
import Footer from "./components/Footer";
import Mainfile from "./components/mainFile";
import EmployerLayout from './layouts/employerlayout';
import PostJob from './pages/employers/postJob';
import Dashboard from './pages/employers/dashboard';
import HomePage from './pages/common/homePage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      {/* Header will always be visible */}
      {/* <Header /> */}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Other common pages */}
        </Route>
        <Route path="/job/:id" element={<JobDetails />} />
        {/* <Route path="/employerlayout" element={<EmployerLayout />} /> */}
        {/* <Route path="/employer/post-job" element={<PostJob />} /> */}

        {/* ✅ NESTED ROUTE using layout */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<Dashboard />} /> {/* 👈 This handles /employer */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="post-job" element={<PostJob />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
