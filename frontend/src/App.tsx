import MainLayout from "./Layouts/MainLayout";
import Homepage from "./Pages/HomePage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MenuPage from "./Pages/MenuPage";
import OrderPage from "./Pages/OrderPage";
import LoginPage from "./Pages/LoginPage";
import AuthLayout from "./Layouts/AuthLayout";
import RegisterPage from "./Pages/RegisterPage";
import { AuthContextProvider } from "./contexts/AuthContext";
import NonComLayout from "./Layouts/NonComLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NonComLayout />}>
      <Route element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/menu" element={<MenuPage />} />

        <Route
          path="/order"
          element={
            <AuthLayout>
              <OrderPage />
            </AuthLayout>
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
