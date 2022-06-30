import { Navigate } from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const routes = (isAuthenticated) => [
   {
      path: "/admin",
      element: isAuthenticated ? (
         <DashboardLayout />
      ) : (
         <Navigate to="/dashboard" />
      ),
      children: [{ path: "dashboard", element: <Dashboard /> }],
   },
   {
      path:"/login",
      element: <Login />

   }
];

export default routes;
