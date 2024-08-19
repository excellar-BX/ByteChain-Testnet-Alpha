import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//Pages
import Home from "./pages/Home";

//Layouts
import RootLayout from "./layouts/RootLayout";
import Wallet from "./pages/Wallet";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="wallet" element={<Wallet />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
