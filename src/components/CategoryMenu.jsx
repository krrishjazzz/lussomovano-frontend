import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "../styles/menu.css";

export default function CategoryMenu() {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <div className="category-dropdown">
      <button
        onClick={() => setCategoryOpen(!categoryOpen)}
        className="icon-button"
      >
        <Menu className="navbar-icon" />
      </button>
      {categoryOpen && (
        <ul className="category-dropdown-menu slide-in">
          <li>
            <Link to="/category/Tshirt" className="dropdown-item">
              T-Shirts
            </Link>
          </li>
          <li>
            <Link to="/category/hoodie" className="dropdown-item">
              Hoodies
            </Link>
          </li>
          <li>
            <Link to="/category/pants" className="dropdown-item">
              Pants
            </Link>
          </li>
          <li>
            <Link to="/category/accessories" className="dropdown-item">
              Accessories
            </Link>
          </li>
          <li>
            <Link to="/category/shoes" className="dropdown-item">
              Shoes
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
