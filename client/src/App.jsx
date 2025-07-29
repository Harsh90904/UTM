import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import Signup from "./assets/pages/Signup";
import Product  from "./assets/pages/Product";
import Account from "./assets/pages/Account_update";
import Services from "./assets/pages/services";
import { useUser } from "./context/UserContext";
import logo from "./images/logo.png";
import "./App.css";

function App() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    navigate("/Login");
  };

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <>
      <header className="w-full mx-auto bg-gray-800 text-white p-4 px-8 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-400 flex items-center gap-2"
        >
          <img src={logo} alt="UTM" className="h-auto w-20 rounded-full" />
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Product" className="hover:text-gray-400">
                Product
              </Link>
            </li>
            <li>
              <Link to="/Orders" className="hover:text-gray-400">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/Services" className="hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link to="/Account" className="hover:text-gray-400">
                Account
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span className="font-semibold text-blue-200">{user.name}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/Login" className="hover:text-gray-400">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/Signup" className="hover:text-gray-400">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Account" element={<Account />} />

        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
