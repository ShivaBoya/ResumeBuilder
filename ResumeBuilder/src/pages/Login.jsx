import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/users/login`, formData);

      // Store tokens and user info
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update global state
      window.dispatchEvent(new Event("storage"));

      // ✅ Success toast with navigation after toast closes
      toast.success(res.data.message || "Login successful!", {
        position: "top-center",
        autoClose: 2000, // 3 seconds
        theme: "colored",
        onClose: () => navigate("/", { replace: true }), // navigate after toast closes
      });
    } catch (err) {
      // ✅ Error toast
      toast.error(
        err.response?.data?.message || "Login failed! Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border rounded-lg p-3 mb-4 focus:outline-none transition-all duration-200";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      {/* Toast container */}
      <ToastContainer />

      <form
        onSubmit={handleLogin}
        className={`bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 ${
          loading ? "opacity-75 scale-[0.98]" : "opacity-100 scale-100"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 hover:text-emerald-600 transition-colors cursor-pointer">
          <Link to="/home">Welcome Back!</Link>
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className={`${inputClasses} border-gray-300 focus:border-green-500`}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          className={`${inputClasses} border-gray-300 focus:border-green-500`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
