import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Header from "./components/common/Header";
// import JobDetails from "./pages/JobDetails";
import Footer from "./components/common/Footer";
// import Mainfile from "./components/mainFile";
// import EmployerLayout from './layouts/employerlayout';
// import PostJob from './pages/employers/postJob';
// import Dashboard from './pages/employers/dashboard';
import HomePage from './pages/common/HomePage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      {/* Header will always be visible */}
      {/* <Header /> */}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* <Route path="/job/:id" element={<JobDetails />} /> */}
        {/* ✅ NESTED ROUTE using layout */}
        
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
