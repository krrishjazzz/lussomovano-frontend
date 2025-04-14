import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/navbar.css";

export default function Navbar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (if the token is available)
    const token = localStorage.getItem("authToken");
    console.log("Token in useEffect:", token); // Check what's stored
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token); // Fetch user data with the token
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Handle Sign Out
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  // Close dropdowns when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Lusso Movano
        </Link>
      </div>

      <div className="navbar-right">
        {/* Search Dropdown */}
        <div className="search-dropdown" ref={searchRef}>
          <button
            className="search-icon-button"
            onClick={() => setShowSearch(!showSearch)}
          >
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {showSearch && (
            <div className="search-dropdown-menu">
              <input
                type="text"
                placeholder="Search..."
                className="search-input-dropdown"
              />
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="icon-link" title="Cart">
          <svg
            className="navbar-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </Link>

        {/* Profile Dropdown */}
        <div className="profile-dropdown" ref={profileRef}>
          <button
            className="icon-link"
            onClick={() => setShowProfile(!showProfile)}
          >
            <svg
              className="navbar-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
            </svg>
          </button>
          {showProfile && (
            <div className="profile-dropdown-menu">
              {!isAuthenticated ? (
                <>
                  <Link to="/auth/signin" className="dropdown-item">
                    Sign In / Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/orders" className="dropdown-item">
                    My Orders
                  </Link>
                  <button className="dropdown-item" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="category-dropdown">
          <button
            className="category-button"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            Menu
          </button>
          {categoryOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to="/category/Tshirt">Tshirt</Link>
                </li>
                <li>
                  <Link to="/category/hoodie">Hoodies</Link>
                </li>
                <li>
                  <Link to="/category/pants">Pants</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
