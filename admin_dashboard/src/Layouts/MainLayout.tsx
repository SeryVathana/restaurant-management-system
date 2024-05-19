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
      <header className="sticky top-0 z-50 bg-white border-b">
        <Navbar />
      </header>
      <main className="flex max-h-[90vh] flex-1 flex-col gap-4 md:gap-8 md:pb-4">
        <div className="mx-auto grid w-full max-w-full items-start gap-6 md:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] px-5 relative">
          <nav className="flex flex-col py-5 gap-5 text-md text-muted-foreground border-r min-h-screen sticky" x-chunk="dashboard-04-chunk-0">
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
          <div className="grid gap-6 py-5">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
