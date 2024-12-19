import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import UserList from "./Pages/UserList/UserList";
import AddUser from "./Pages/AddUser/AddUser";
import Profile from "./Pages/Profile/Profile";
import MasterLayout from "./Layouts/MaserLayout/MasterLayout";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import { ToastContainer } from "react-toastify";
import ProtectPath from "./ProtectPath/ProtectPath";
import { FC, ReactElement } from 'react';

interface RouteObject {
  path?: string;
  element: ReactElement;
  errorElement?: ReactElement;
  children?: RouteObject[];
  index?: boolean;
}

const App: FC = (): ReactElement => {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <ProtectPath><Home /></ProtectPath> },
        { path: "home", element: <ProtectPath><Home /></ProtectPath> },
        { path: "userslist", element: <ProtectPath><UserList /></ProtectPath> },
        { path: "adduser", element: <ProtectPath><AddUser /></ProtectPath> },
        { path: "profile", element: <ProtectPath><Profile /></ProtectPath> },
        { path: "update/:id", element: <ProtectPath><UpdateUser /></ProtectPath> },
      ],
    },
  ] as RouteObject[]);

  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer />
    </>
  );
};

export default App;
