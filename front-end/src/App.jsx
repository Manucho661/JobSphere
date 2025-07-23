import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from './pages/common/HomePage';
import Login from './pages/login';
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
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
