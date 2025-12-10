import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function NavBarBeforeLogin() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          ResumeAI
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-primary-foreground hover:bg-blue-600 px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground hover:bg-secondary/10 rounded-full transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full glass border-b border-glass-border md:hidden flex flex-col p-6 space-y-4 animate-fade-in-up">
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block text-center w-full py-3 rounded-xl text-foreground font-medium hover:bg-secondary/10 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMobileOpen(false)}
            className="block text-center w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBarBeforeLogin;
