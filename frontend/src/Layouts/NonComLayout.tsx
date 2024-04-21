import { Outlet } from "react-router-dom";

const NonComLayout = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NonComLayout;
