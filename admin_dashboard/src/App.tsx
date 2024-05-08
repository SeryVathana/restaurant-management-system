import MainLayout from "./Layouts/MainLayout";
import Homepage from "./Pages/HomePage";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import NonComLayout from "./Layouts/NonComLayout";
import LoginPage from "./Pages/LoginPage";
import { fetchUserData } from "./redux/slice/authThunk";
import { store } from "./redux/store";
import { getToken } from "./utils/HelperFunctions";
import AdminPage from "./Pages/AdminPage";
import CustomerPage from "./Pages/CustomerPage";
import StaffPage from "./Pages/StaffPage";
import CategoryPage from "./Pages/CategoryPage";
import OrderPage from "./Pages/OrderPage";
import FoodPage from "./Pages/FoodPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<NonComLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="food" element={<FoodPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="staff" element={<StaffPage />} />
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
