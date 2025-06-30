import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Added this
import Home from "./pages/Home";
import Header from "./components/Header";

import JobDetails from "./pages/JobDetails"; // ✅ Make sure this file exists
import Footer from "./components/Footer";
 import Mainfile from "./components/mainFile"; // ✅ Make sure this file exists
// import EmployerDashboard from './pages/employers/dashboard';
import EmployerLayout from './layouts/employerlayout';
import PostJob from './pages/employers/postJob';
import Dashboard from './pages/employers/dashboard';
function App() {
  return (
    
    <Router>
       {/* Header will always be visible */}
       <Header />
      
      <Routes>
        <Route path="/" element={<Mainfile />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path= "/employerlayout" element={<EmployerLayout/>} />
        {/* <Route path="/employers/dashboard" element={<EmployerDashboard />} /> ✅ Add this */}
        <Route path="/employer/post-job" element={<PostJob />} />
        <Route
          path="/employer/dashboard"
          element={            // What to show at this URL
            <EmployerLayout>   // Wrap content inside layout
              <Dashboard />    // Dashboard page is the child content
            </EmployerLayout>
          }
        />

      </Routes>
      {/* Header will always be visible */}
      {/* < Footer /> */}
      
    </Router>
  );
}

export default App;
