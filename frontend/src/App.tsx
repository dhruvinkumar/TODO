import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

// Function to check if a user is authenticated
const isAuthenticated = (): boolean => {
  // Replace with actual authentication check logic
  return !!localStorage.getItem("token");
};

// Function to handle protected routes
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
              <ProtectedRoute element={<Dashboard />} />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/dashboard" : "/signin"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
