// App.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavBarBeforeLogin from "./components/NavBarBeforeLogin";
import NavBarAfterLogin from "./components/NavBarAfterLogin";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeBuilder from "./pages/ResumeBuilder";
import MyResumes from "./pages/MyResume";
import Premium from "./pages/Primium";
import HomeBeforeLogin from "./pages/HomeBeforeLogin";
import HomeAfterLogin from "./pages/AfterLoginHome";
import AI from "./pages/Ai";
import Templates from "./pages/Template";
import Profile from "./pages/Profile";

// ✅ PrivateRoute wrapper
function PrivateRoute({ children, redirectTo = "/login" }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to={redirectTo} replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken") // ✅ Initial state from storage
  );

  // ✅ Update login status when storage changes (cross-tab)
  const updateLoginStatus = useCallback(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, [updateLoginStatus]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* ✅ Navbar */}
      {isLoggedIn ? (
        <NavBarAfterLogin onLogout={handleLogout} />
      ) : (
        <NavBarBeforeLogin />
      )}

      {/* ✅ Main content */}
      <div className="pt-16">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={isLoggedIn ? <HomeAfterLogin /> : <HomeBeforeLogin />}
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/resume-builder"
            element={
              <PrivateRoute>
                <ResumeBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-resumes"
            element={
              <PrivateRoute>
                <MyResumes />
              </PrivateRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <PrivateRoute>
                <Premium />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai"
            element={
              <PrivateRoute>
                <AI />
              </PrivateRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <PrivateRoute>
                <Templates />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* ✅ Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
