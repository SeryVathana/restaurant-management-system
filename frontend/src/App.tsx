import MainLayout from "./Layouts/MainLayout";
import Homepage from "./Pages/HomePage";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MenuPage from "./Pages/MenuPage";
import OrderPage from "./Pages/OrderPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import RegisterPage from "./Pages/RegisterPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import NonComLayout from "./Layouts/NonComLayout";
import { getToken } from "./utils/HelperFunctions";
import { fetchUserData } from "./redux/slice/authThunk";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import TestPage from "./Pages/TestPage";
import EditProfilePage from "./Pages/EditProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/testing" element={<TestPage />} />
      <Route element={<NonComLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/menu" element={<MenuPage />} />

        <Route
          path="/order"
          element={
            <ProtectedLayout>
              <OrderPage />
            </ProtectedLayout>
          }
        />

        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Route>
    </Route>
  )
);

let persistor = persistStore(store);

function App() {
  if (getToken()) {
    store.dispatch(fetchUserData());
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
