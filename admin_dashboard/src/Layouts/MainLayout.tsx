import Navbar from "@/components/navbar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { NavLink, Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="relative">
      <header className="fixed w-full top-0 z-50 h-22 bg-card border-b">
        <Navbar />
      </header>

      <main className="overflow-hidden">
        <nav
          className=" min-h-[calc(100dvh)] max-h-[calc(100dvh)]  mt-20  w-56 fixed top-0 left-0  col-span-2 flex flex-col p-5 bg-card gap-5 border-r"
          x-chunk="dashboard-04-chunk-0"
        >
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "font-semibold text-primary" : "";
            }}
          >
            Overview
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => {
              return isActive ? "font-semibold text-primary" : "";
            }}
          >
            Admins
          </NavLink>
          <NavLink
            to="/customer"
            className={({ isActive }) => {
              return isActive ? "font-semibold text-primary" : "";
            }}
          >
            Customers
          </NavLink>
          <NavLink
            to="/order"
            className={({ isActive }) => {
              return isActive ? "font-semibold text-primary" : "";
            }}
          >
            Orders
          </NavLink>
          <NavLink
            to="/staff"
            className={({ isActive }) => {
              return isActive ? "font-semibold text-primary" : "";
            }}
          >
            Staffs
          </NavLink>
          <NavLink
            to="/food"
            className={({ isActive }) => {
              return isActive ? "font-semibold text-primary" : "";
            }}
          >
            Food
          </NavLink>
        </nav>
        <div className="p-5 col-span-10 pl-60 w-full  mt-20 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
