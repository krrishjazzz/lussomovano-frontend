// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-serif tracking-wider">
        Lusso Movano
      </Link>
      <div className="space-x-4">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart
        </Link>
      </div>
    </nav>
  );
}
