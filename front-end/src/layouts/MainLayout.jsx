import Header from "../components/common/Header";
import Footer from '../components/common/Footer';
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

import "../styles/main.css"
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main min-h-screen">
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
