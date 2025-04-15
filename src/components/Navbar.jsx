import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingBag, User, Search } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import CategoryMenu from "./CategoryMenu"; // Importing CategoryMenu
import "../styles/navbar.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
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
        <ProfileDropdown />

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

        {/* Category Menu (Now in its own component) */}
        <CategoryMenu />
      </div>
    </nav>
  );
}
