"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import ThemeToggle from "./ThemeContext";

export default function Header({ onReservationClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cover bg-center bg-no-repeat border-b border-white/20 shadow-sm transition-all duration-700 ease-in-out dark:bg-black bg-black/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="./images/logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-white text-lg font-semibold hidden sm:block">
            2000 Habesha
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-24">
          {[
            { label: "Home", path: "/" },
            { label: "Menu", path: "/menu" },
            { label: "Drinks", path: "/Drinks" },
            { label: "Contact", path: "/contact" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-white hover:text-yellow-400 transition ${
                isActive(path) ? "text-yellow-400" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Language Switch */}
          <div className="flex items-center space-x-1 border-l border-white/30 pl-4 ml-4">
            <Globe size={16} className="text-white" />
            <span className="text-white text-sm">
              EN | <span className="text-yellow-400">አማ</span>
            </span>
          </div>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-3">
          <ThemeToggle /> {/* dark/light toggle button */}
          <button
            onClick={onReservationClick}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg transition hidden md:block"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black px-4 pt-4 pb-6 space-y-4 text-white dark:bg-black">
          {[
            { label: "Home", path: "/" },
            { label: "Menu", path: "/menu" },
            { label: "Signature Dishes", path: "/signature-dishes" },
            { label: "Contact", path: "/contact" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="block hover:text-yellow-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center space-x-1 pt-2 border-t border-white/20">
            <Globe size={16} className="text-white" />
            <span className="text-sm">
              EN | <span className="text-yellow-400">አማ</span>
            </span>
          </div>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              onReservationClick();
            }}
            className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
          >
            Reserve
          </button>
        </div>
      )}
    </header>
  );
}
