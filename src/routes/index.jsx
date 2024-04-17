import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import Music from "../pages/Music";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/ProfilePage";
import Edit from "../pages/Editpage";
import Test from "../pages/test";
const routes = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  {
    path: "/music",
    element: <Music />,
  },
  {
    path: "/playlist",
    element: <Playlist />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);
export default routes;
