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
import ThemeToggle from "./ThemeToggle";

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
      <header className="fixed top-0 left-0 right-0 h-16 glass z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo / Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-secondary/10 rounded-full md:hidden text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <HiMenu size={24} />
            </button>
            <span
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate("/")}
            >
              ResumeAI
            </span>
          </div>

          {/* Top navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${isActive("/")
                ? "bg-primary/10 text-primary font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"
                }`}
            >
              <HiHome size={20} /> Home
            </Link>
            <Link
              to="/resume-builder"
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${isActive("/resume-builder")
                ? "bg-primary/10 text-primary font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"
                }`}
            >
              <HiOutlineDocumentText size={20} /> Builder
            </Link>
            <Link
              to="/my-resumes"
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${isActive("/my-resumes")
                ? "bg-primary/10 text-primary font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"
                }`}
            >
              <HiOutlineUserGroup size={20} /> My Resumes
            </Link>
            <Link
              to="/templates"
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${isActive("/templates")
                ? "bg-primary/10 text-primary font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"
                }`}
            >
              <HiOutlineViewGrid size={20} /> Templates
            </Link>
            <Link
              to="/premium"
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${isActive("/premium")
                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"
                }`}
            >
              <HiOutlineBadgeCheck size={20} /> Premium
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm"
            >
              <HiStar size={18} />
              <span>AI Copilot</span>
            </button>

            <div className="h-6 w-px bg-border mx-1 hidden md:block"></div>

            <ThemeToggle />

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-full hover:bg-secondary/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <HiBell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-secondary/10 rounded-full text-foreground transition-all duration-300 border border-transparent hover:border-border"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-primary font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-card p-2 flex flex-col animate-fade-in-up origin-top-right">
                  <div className="px-4 py-3 border-b border-border mb-1">
                    <p className="text-sm font-medium text-foreground">{username}</p>
                    <p className="text-xs text-muted-foreground">Free Plan</p>
                  </div>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
                  >
                    <HiUserCircle size={18} /> Profile
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors mt-1"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full glass border-b border-glass-border flex flex-col md:hidden z-10 animate-fade-in-up">
            <div className="p-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive("/") ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"}`}
              >
                <HiHome size={22} /> Home
              </Link>
              <Link
                to="/resume-builder"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive("/resume-builder") ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"}`}
              >
                <HiOutlineDocumentText size={22} /> Resume Builder
              </Link>
              <Link
                to="/my-resumes"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive("/my-resumes") ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"}`}
              >
                <HiOutlineUserGroup size={22} /> My Resumes
              </Link>
              <Link
                to="/templates"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive("/templates") ? "bg-primary/10 text-primary" : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"}`}
              >
                <HiOutlineViewGrid size={22} /> Templates
              </Link>
              <Link
                to="/premium"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive("/premium") ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" : "text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-foreground"}`}
              >
                <HiOutlineBadgeCheck size={22} /> Premium AI
              </Link>

              <div className="h-px bg-border my-2"></div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setIsCopilotOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
              >
                <HiStar size={22} /> AI Assistant
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Copilot Widget Slide-In */}
      <CopilotWidget
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </>
  );
}

export default NavBarAfterLogin;
