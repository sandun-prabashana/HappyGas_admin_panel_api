import {Navigate} from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import React from "react";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CustomerLayout from "./components/CustomerLayout";
import SellerLayout from "./components/SellerLayout"
import AddSellerLayout from "./components/AddSellerLayout"
import ProductLayout from "./components/ProductLayout";
import DistributeLayout from "./components/DistributeLayout";
import RecordLayout from "./components/RecordLayout"
import PickUpOrdersLayout from "./components/PickUpOrdersLayout"
import DeliveryordersLayout from "./components/DeliveryordersLayout"


const routes = ({authStatus, userType}) => [
   {
       path: "/admin",
       element: authStatus && userType === "ADMIN" ? <DashboardLayout userType={userType}/> : <Navigate to="/login"/>,
       children: [
           {path: "", element: <Navigate to="/admin/dashboard"/>},
           {path: "dashboard", element: <Dashboard/>},
           {path: "customer", element: <CustomerLayout/>},
           {path: "seller", element: <SellerLayout/>},
           {path: "addseller", element: <AddSellerLayout/>},
           {path: "product", element: <ProductLayout/>},
           {path: "distribute", element: <DistributeLayout/>},
           {path: "record", element: <RecordLayout/>},
           {path: "item/management", element: <Dashboard/>},
           {path: "item/management/new", element: <Dashboard/>},
           {path: "item/management/:id/edit", element: <Dashboard/>},
       ],
   },
   {
       path: "/seller",
       element: authStatus && userType === "SELLER" ? <DashboardLayout userType={userType}/> :
           <Navigate to="/login"/>,
       children: [
           {path: "", element: <Navigate to="/seller/dashboard"/>},
           {path: "dashboard", element: <Dashboard2/>},
           {path: "pickuporders", element: <PickUpOrdersLayout/>},
           {path: "deliveryorders", element: <DeliveryordersLayout/>},
           {path: "customer/management/:id/edit", element: <Dashboard/>},
           {path: "order", element: <Dashboard/>},
           {path: "order/new", element: <Dashboard/>},
           {path: "order/:id/edit", element: <Dashboard/>},

       ],
   },
   {
       path: "/",
       element: <MainLayout/>,
       children: [
           {path: "login", element: <Login/>},
           {path: "404", element: <NotFound/>},
           {path: "/", element: <Navigate to="/login"/>},
           {path: "*", element: <Navigate to="/404"/>},
       ],
   },
];

export default routes;

