import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingBag, User, Search, Menu } from "lucide-react";
import "../styles/navbar.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [animate, setAnimate] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${animate ? "navbar-pop" : ""}`}>
      <div className="navbar-left" />

      <div className="navbar-brand-center">
        <Link to="/home" className="navbar-brand no-style-link">
          Lusso Movano
        </Link>
      </div>

      <div className="navbar-right">
        {/* Shopping Bag */}
        <button className="icon-button" onClick={() => navigate("/cart")}>
          <ShoppingBag className="navbar-icon" />
        </button>

        {/* Profile */}
        <div className="profile-dropdown" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="icon-button"
          >
            <User className="navbar-icon" />
          </button>
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

        {/* Search */}
        <div className="search-dropdown" ref={searchRef}>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="icon-button"
          >
            <Search className="navbar-icon" />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          )}
        </div>

        {/* Category Menu */}
        <div className="category-dropdown">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="icon-button"
          >
            <Menu className="navbar-icon" />
          </button>
          {categoryOpen && (
            <ul className="dropdown-menu">
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
