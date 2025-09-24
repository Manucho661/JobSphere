import Header from "../components/common/Header";
import Footer from '../components/common/Footer';

import "../styles/mainlayout.scss"
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <div className="app-wrapper">
        <Header />
        <main className="main min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
