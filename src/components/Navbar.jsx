import { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();

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
        <Link to="/home" className="navbar-brand">
          Lusso Movano
        </Link>
      </div>

      <div className="navbar-right">
        {/* Search Icon */}
        <div className="search-dropdown" ref={searchRef}>
          <button onClick={() => setShowSearch(!showSearch)}>🔍</button>
          {showSearch && <input type="text" placeholder="Search..." />}
        </div>

        {/* Cart */}
        <Link to="/cart" className="navbar-cart-icon">
          🛒
        </Link>

        {/* Profile */}
        <div className="profile-dropdown" ref={profileRef}>
          <button onClick={() => setShowProfile(!showProfile)}>👤</button>
          {showProfile && (
            <div className="profile-dropdown-menu">
              {!isAuthenticated ? (
                <Link to="/auth/signin" className="dropdown-item">
                  Sign In / Register
                </Link>
              ) : (
                <>
                  <Link to="/orders" className="dropdown-item">
                    My Orders
                  </Link>
                  <button onClick={logout} className="dropdown-item">
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Category Menu */}
        <div className="category-dropdown">
          <button onClick={() => setCategoryOpen(!categoryOpen)}>Menu</button>
          {categoryOpen && (
            <ul>
              <li>
                <Link to="/category/Tshirt">Tshirt</Link>
              </li>
              <li>
                <Link to="/category/hoodie">Hoodie</Link>
              </li>
              <li>
                <Link to="/category/pants">Pants</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
