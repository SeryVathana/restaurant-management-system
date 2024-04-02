import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
