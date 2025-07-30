import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from './pages/common/HomePage';
import Login from './pages/login';
import Employer from './pages/employers/dashboard';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Main layout with nested route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* ✅ Login route placed correctly */}
        <Route path="/login" element={<Login />}/>
        <Route path="/employer" element={<Employer />} />
      </Routes>
    </Router>
  );
}

export default App;
