"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header({ onReservationClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span>
                {" "}
                <img
                  src="./images/logo.jpg"
                  alt="Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </span>
            </div>
            <span className="text-white font-semibold hidden sm:block">
              2000 Habesha
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-white hover:text-yellow-400 transition-colors ${
                isActive("/") ? "text-yellow-400" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`text-white hover:text-yellow-400 transition-colors ${
                isActive("/menu") ? "text-yellow-400" : ""
              }`}
            >
              Menu
            </Link>
            <Link
              to="/drinks"
              className={`text-white hover:text-yellow-400 transition-colors ${
                isActive("/drinks") ? "text-yellow-400" : ""
              }`}
            >
              Drinks
            </Link>
            <Link
              to="/our-story"
              className={`text-white hover:text-yellow-400 transition-colors ${
                isActive("/our-story") ? "text-yellow-400" : ""
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/feedback"
              className={`text-white hover:text-yellow-400 transition-colors ${
                isActive("/feedback") ? "text-yellow-400" : ""
              }`}
            >
              Feedback
            </Link>
            <Link
              to="/contact"
              className={`text-white hover:text-yellow-400 transition-colors ${
                isActive("/contact") ? "text-yellow-400" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-white hover:text-yellow-400 transition-colors p-2"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={onReservationClick}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Reserve
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                to="/"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Menu
              </Link>
              <Link
                to="/drinks"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Drinks
              </Link>
              <Link
                to="/our-story"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Our Story
              </Link>
              <Link
                to="/feedback"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Feedback
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
