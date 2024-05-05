import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./component/ErrorFallback";
import "regenerator-runtime/runtime.js";
import Fallback from "./component/Fallback";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => (window.location.href = "/")}
  >
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={routes} />
    </Suspense>
  </ErrorBoundary>
);
