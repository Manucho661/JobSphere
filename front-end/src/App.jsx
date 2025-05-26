import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Added this
import Home from "./pages/Home";
import Header from "./components/Header";

import JobDetails from "./pages/JobDetails"; // ✅ Make sure this file exists
import Footer from "./components/Footer";
 import Mainfile from "./components/mainFile"; // ✅ Make sure this file exists
import EmployerDashboard from './pages/employers/Dashboard';

function App() {
  return (
    
    <Router>
       {/* Header will always be visible */}
       <Header />
      
      <Routes>
        <Route path="/" element={<Mainfile />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/employers/dashboard" element={<EmployerDashboard />} /> {/* ✅ Add this */}
      </Routes>


      {/* Header will always be visible */}
      < Footer />
    </Router>
  );
}

export default App;
