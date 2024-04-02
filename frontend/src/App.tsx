import MainLayout from "./Layouts/MainLayout";
import Homepage from "./Pages/HomePage";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Homepage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
