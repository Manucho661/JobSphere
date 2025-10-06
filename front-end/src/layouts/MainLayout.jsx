import Header from "../components/common/Header";
import Footer from '../components/common/Footer';

import "../components/common/mainlayout.scss"
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <div className="app-wrapper">
        <Header />
        <main className="main min-h-screen py-2">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
