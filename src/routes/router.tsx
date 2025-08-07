import {createBrowserRouter} from "react-router-dom";
// Trade Deck layout
import AllProducts from "../pages/Products/AllProducts";
import CreateProduct from "../pages/Products/CreateProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import SalesHistory from "../pages/SalesManagement/SalesHistory";
import Home from "../pages/HomePage/Home";
import LowStock from "../pages/Products/LowStock";
import PolishRequest from "../pages/PolishService/PolishRequest";
import PolishService from "../pages/PolishService/PolishService";
import VerifyProduct from "../pages/Products/VerifyProduct";
import MainLayout from "../components/layout/Root/MainLayout";
import TradeDeck from "../components/layout/TradeDeck/TradeDeck";
import Catalogue from "../pages/Catalogue/Catalogue";
import Cart from "../pages/Cart/Cart";
import CheckoutPage from "../pages/Orders/Checkout";


export const router = createBrowserRouter([
  {
    element: <MainLayout />, // Main Layout for public pages
    children: [
      {path: "/", element: <Home />},
      {path: "/catalogue", element: <Catalogue />},
      {
        path: "/cart",
        element: (
          <ProtectedRoute role="buyer">
            {" "}
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role="buyer">
            {" "}
            <CheckoutPage/>
          </ProtectedRoute>
        ),
      },
      {path: "/login", element: <Login />},
      {path: "/register", element: <Register />},
    ],
  },

  // **Trade Deck Pages using TradeDeckLayout**
  {
    path: "/myhub",
    element: (
      <ProtectedRoute role="both">
        <TradeDeck />
      </ProtectedRoute>
    ),
    children: [
      {path: "furniture-stock", element: <AllProducts />},
      {path: "sales-history", element: <SalesHistory />},
      {path: "create-product", element: <CreateProduct />},
      {path: "low-stock", element: <LowStock />},
      {path: "polish-requests", element: <PolishRequest />},
      {path: "polish-service", element: <PolishService />},
      {path: "verify-product", element: <VerifyProduct />},
    ],
  },
]);
