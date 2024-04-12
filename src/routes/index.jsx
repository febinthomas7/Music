import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import Music from "../pages/Music";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";
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
]);
export default routes;
