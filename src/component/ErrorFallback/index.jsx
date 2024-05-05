import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="bg-black fixed top-0 w-full h-svh left-0 z-30 justify-center flex items-center">
      <div>
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  );
};

export default ErrorFallback;
