import { createBrowserRouter } from "react-router-dom"
import Users from "./pages/Users/Users.tsx"
import CategoriesPage from "./pages/Categories/index.ts"
import Dashboard from "./pages/Dashboard/Dashboard.tsx"
import Brands from "./pages/Brands/Brands.tsx"
import Orders from "./pages/Orders/Orders.tsx"
import AdminLayout from "./layouts/AdminLayout.tsx"
import Login from "./pages/Login"

export const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])
