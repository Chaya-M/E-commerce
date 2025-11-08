import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <h1 className="text-2xl font-bold tracking-wide">
          <NavLink to="/" className="flex items-center gap-1">
            🛒 Vibe Commerce
          </NavLink>
        </h1>

        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-indigo-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-indigo-200"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-indigo-200"
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-indigo-200"
              }
            >
              My Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
