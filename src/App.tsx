import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import UserList from "./Pages/UserList/UserList";
import { ToastContainer } from "react-toastify";
import ProtectPath from "./ProtectPath/ProtectPath";
import MasterLayout from "./Layouts/MaserLayout/MasterLayout";
import Form from "./Pages/Form/Form";

const App: React.FC = () => {
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
        {
          index: true,
          element: (
            <ProtectPath>
              <Home />
            </ProtectPath>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectPath>
              <Home />
            </ProtectPath>
          ),
        },
        {
          path: "userslist",
          element: (
            <ProtectPath>
              <UserList />
            </ProtectPath>
          ),
        },
        {
          path: "form/:page/:id?",
          element: (
            <ProtectPath>
              <Form />
            </ProtectPath>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <ToastContainer />
    </>
  );
};

export default App;
