import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import WatchStream from "../pages/WatchStream";

const Live = lazy(() => import("../pages/Live"));
const Dashboard = lazy(() => import("../pages/DashboardPage"));
const Music = lazy(() => import("../pages/Music"));
const Playlist = lazy(() => import("../pages/Playlist"));
const Search = lazy(() => import("../pages/Search"));
const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Profile = lazy(() => import("../pages/ProfilePage"));
const Edit = lazy(() => import("../pages/Editpage"));

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user");
  return isAuthenticated == "false" || false || undefined ? (
    <Navigate to="/signin" />
  ) : (
    children
  );
};

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
    element: (
      <ProtectedRoute>
        {" "}
        <Profile />{" "}
      </ProtectedRoute>
    ),
  },

  {
    path: "/edit",
    element: (
      <ProtectedRoute>
        <Edit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/live",
    element: <Live />,
  },
  {
    path: "/live/:roomId",
    element: (
      <ProtectedRoute>
        <WatchStream />
      </ProtectedRoute>
    ),
  },
]);
export default routes;
