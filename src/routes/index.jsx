import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import Music from "../pages/Music";
import Playlist from "../pages/Playlist";
import SearchBoard from "../component/SearchBoard";
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
    path: "/search/:id",
    element: <SearchBoard />,
  },
]);
export default routes;
