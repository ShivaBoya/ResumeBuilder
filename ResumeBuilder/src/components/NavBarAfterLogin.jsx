import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HiMenu,
  HiHome,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
  HiBell,
  HiStar,
  HiOutlineBadgeCheck,
  HiUserCircle,
} from "react-icons/hi";
import CopilotWidget from "../pages/CopilotWidget"; 

function NavBarAfterLogin({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false); 

  let username = "User";
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      username = parsedUser?.name || parsedUser?.username || storedUser;
    } catch {
      username = storedUser;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-900 text-white flex items-center px-4 z-20 shadow-md">
        {/* Logo / Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-blue-800 rounded md:hidden"
            aria-label="Toggle menu"
          >
            <HiMenu size={24} />
          </button>
          <span className="text-lg font-bold cursor-pointer">ResumeBuilder</span>
        </div>

        <div className="flex-grow" />

        {/* Top navigation links */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800 ${
              isActive("/") ? "bg-blue-700" : ""
            }`}
          >
            <HiHome size={20} /> Home
          </Link>
          <Link
            to="/resume-builder"
            className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800 ${
              isActive("/resume-builder") ? "bg-blue-700" : ""
            }`}
          >
            <HiOutlineDocumentText size={20} /> Resume Builder
          </Link>
          <Link
            to="/my-resumes"
            className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800 ${
              isActive("/my-resumes") ? "bg-blue-700" : ""
            }`}
          >
            <HiOutlineUserGroup size={20} /> My Resumes
          </Link>
          <Link
            to="/templates"
            className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800 ${
              isActive("/templates") ? "bg-blue-700" : ""
            }`}
          >
            <HiOutlineViewGrid size={20} /> Templates
          </Link>
          <Link
            to="/premium"
            className={`flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800 ${
              isActive("/premium") ? "bg-blue-700" : ""
            }`}
          >
            <HiOutlineBadgeCheck size={20} /> Premium AI
          </Link>
          {/* AI Assistant opens CopilotWidget instead of navigation */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            <HiStar size={20} /> AI Assistant
          </button>
        </nav>

        <div className="flex-grow" />

        {/* Notifications & Profile */}
        <div className="flex items-center gap-3 relative">
          {/* Welcome text */}
          <span className="hidden md:block mr-2">Welcome, {username}!</span>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative hover:bg-blue-800 p-2 rounded"
          >
           
            
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:bg-blue-800 p-2 rounded"
            >
              <HiUserCircle size={24} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg flex flex-col">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="px-4 py-2 text-left hover:bg-gray-200"
                >
                  Profile
                </button>
               
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 text-left text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-900 flex flex-col md:hidden z-10">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-blue-800"
            >
              Home
            </Link>
            <Link
              to="/resume-builder"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-blue-800"
            >
              Resume Builder
            </Link>
            <Link
              to="/my-resumes"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-blue-800"
            >
              My Resumes
            </Link>
            <Link
              to="/templates"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-blue-800"
            >
              Templates
            </Link>
            <Link
              to="/premium"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1 px-4 py-2 hover:bg-blue-800"
            >
              <HiOutlineBadgeCheck size={20} /> Premium AI
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                setIsCopilotOpen(true);
              }}
              className="px-4 py-2 hover:bg-blue-800 text-left"
            >
              AI Assistant
            </button>

            {/* Mobile profile dropdown */}
            <div className="px-4 py-2 border-t border-blue-700">
              <span className="block mb-1">Welcome, {username}!</span>
              
            </div>
          </div>
        )}
      </header>

      {/* ✅ Copilot Widget Slide-In */}
      <CopilotWidget
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </>
  );
}

export default NavBarAfterLogin;
