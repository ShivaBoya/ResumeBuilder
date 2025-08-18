import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/users/signup`, formData);
      const successMessage = res.data.message || "Signup successful!";
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Signup failed! Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border rounded-lg p-3 mb-4 focus:outline-none transition-all duration-200";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
      <form
        onSubmit={handleSignup}
        className={`bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 ${
          loading ? "opacity-75 scale-[0.98]" : "opacity-100 scale-100"
        }`}
        aria-label="Signup Form"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Create an Account
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          required
          className={`${inputClasses} border-gray-300 focus:border-green-500`}
        />

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
          autoComplete="new-password"
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </form>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
