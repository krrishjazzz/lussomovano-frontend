import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";
import "../styles/profiledropdown.css";

export default function ProfileDropdown() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile-dropdown" ref={profileRef}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="icon-button"
      >
        <User className="navbar-icon" />
      </button>
      <div
        className={`profile-dropdown-menu ${
          showProfile ? "fade-in" : "fade-out"
        }`}
      >
        {!isAuthenticated ? (
          <Link
            to="/auth/signin"
            className="dropdown-item"
            onClick={() => setShowProfile(false)}
          >
            Sign In / Register
          </Link>
        ) : (
          <>
            <Link
              to="/orders"
              className="dropdown-item"
              onClick={() => setShowProfile(false)}
            >
              My Orders
            </Link>
            <Link
              to="/account"
              className="dropdown-item"
              onClick={() => setShowProfile(false)}
            >
              Account Settings
            </Link>
            <Link
              to="/addresses"
              className="dropdown-item"
              onClick={() => setShowProfile(false)}
            >
              Address Book
            </Link>
            <Link
              to="/wallet"
              className="dropdown-item"
              onClick={() => setShowProfile(false)}
            >
              Wallet
            </Link>
            <Link
              to="/saved"
              className="dropdown-item"
              onClick={() => setShowProfile(false)}
            >
              Saved Items
            </Link>
            <Link
              to="/appointments"
              className="dropdown-item"
              onClick={() => setShowProfile(false)}
            >
              Appointments
            </Link>
            <button
              onClick={() => {
                logout();
                setShowProfile(false);
              }}
              className="dropdown-item sign-out"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
