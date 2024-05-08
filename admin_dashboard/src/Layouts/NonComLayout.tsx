import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NonComLayout = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NonComLayout;
