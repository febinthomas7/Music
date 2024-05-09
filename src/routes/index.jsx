import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Live = lazy(() => import("../pages/DashboardPage/Live"));
const Dashboard = lazy(() => import("../pages/DashboardPage"));
const Music = lazy(() => import("../pages/Music"));
const Playlist = lazy(() => import("../pages/Playlist"));
const Search = lazy(() => import("../pages/Search"));
const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Profile = lazy(() => import("../pages/ProfilePage"));
const Edit = lazy(() => import("../pages/Editpage"));

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
    path: "/live",
    element: <Live />,
  },
]);
export default routes;
