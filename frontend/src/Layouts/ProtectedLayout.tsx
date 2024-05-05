import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.token) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
