import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "../styles/profiledropdown.css";

export default function ProfileDropdown() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  console.log("inside profile drop down jsx");

  return (
    <div className="profile-dropdown">
      <button className="icon-link">
        <svg /* SVG icon */ />
      </button>
      <div className="profile-dropdown-menu">
        {!isAuthenticated ? (
          <Link to="/auth" className="dropdown-item">
            Sign In / Register
          </Link>
        ) : (
          <>
            <Link to="/orders" className="dropdown-item">
              My Orders
            </Link>
            <button className="dropdown-item" onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
