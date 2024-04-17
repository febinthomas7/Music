import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "regenerator-runtime/runtime.js";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);
