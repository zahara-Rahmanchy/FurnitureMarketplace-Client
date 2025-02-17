// import {createBrowserRouter} from "react-router-dom";
// // import MainLayout from "../components/layout/MainLayout";
// import AllProducts from "../pages/Products/AllProducts";
// import CreateProduct from "../pages/Products/CreateProduct";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import App from "../App";
// import ProtectedRoute from "../components/layout/ProtectedRoute";
// import SalesHistory from "../pages/SalesManagement/SalesHistory";
// import Home from "../pages/Home";
// import LowStock from "../pages/Products/LowStock";
// import PolishRequest from "../pages/PolishService/PolishRequest";
// import PolishService from "../pages/PolishService/PolishService";
// import VerifyProduct from "../pages/Products/VerifyProduct";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,

//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/all-products",
//         element: (
//           // <ProtectedRoute role="both">

//           <AllProducts />
//         ),
//         // </ProtectedRoute>
//       },
//       {
//         path: "create-product",
//         element: (
//           <ProtectedRoute role="seller">
//             <CreateProduct />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "low-stock",
//         element: (
//           <ProtectedRoute role="seller">
//             <LowStock />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "sales-history",
//         element: (
//           <ProtectedRoute role="seller">
//             <SalesHistory />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "polish-requests",
//         element: (
//           <ProtectedRoute role="buyer">
//             <PolishRequest />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "polish-service",
//         element: (
//           <ProtectedRoute role="seller">
//             <PolishService />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "verify-product",
//         element: (
//           <ProtectedRoute role="buyer">
//             <VerifyProduct />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//     ],
//   },
// ]);
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

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <MainLayout />,
//         children: [
//           {path: "/", element: <Home />},
//           {path: "/catalogue", element: <AllProducts />},
//           {
//             path: "/hub",
//             element: (
//               // <ProtectedRoute role="both">
//               <TradeDeck />
//               // </ProtectedRoute>
//             ),
//             children: [
//               {
//                 path: "create-product",
//                 element: (
//                   // <ProtectedRoute role="seller">
//                   <CreateProduct />
//                   // </ProtectedRoute>
//                 ),
//               },
//               {
//                 path: "low-stock",
//                 element: (
//                   <ProtectedRoute role="seller">
//                     <LowStock />
//                   </ProtectedRoute>
//                 ),
//               },
//               {
//                 path: "sales-history",
//                 element: (
//                   <ProtectedRoute role="seller">
//                     <SalesHistory />
//                   </ProtectedRoute>
//                 ),
//               },
//               {
//                 path: "polish-requests",
//                 element: (
//                   <ProtectedRoute role="buyer">
//                     <PolishRequest />
//                   </ProtectedRoute>
//                 ),
//               },
//               {
//                 path: "polish-service",
//                 element: (
//                   <ProtectedRoute role="seller">
//                     <PolishService />
//                   </ProtectedRoute>
//                 ),
//               },
//               {
//                 path: "verify-product",
//                 element: (
//                   <ProtectedRoute role="buyer">
//                     <VerifyProduct />
//                   </ProtectedRoute>
//                 ),
//               },
//             ],
//           },
//         ],
//       },
//       {path: "login", element: <Login />},
//       {path: "register", element: <Register />},
//     ],
//   },
// ]);
export const router = createBrowserRouter([
  {
    element: <MainLayout />, // Main Layout for public pages
    children: [
      {path: "/", element: <Home />},
      {path: "/catalogue", element: <Catalogue />},
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
