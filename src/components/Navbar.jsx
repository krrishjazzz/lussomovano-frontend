// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar() {
//     const [categoryOpen, setCategoryOpen] = useState(false);
//     const [showSearch, setShowSearch] = useState(false);

//   return (
//     <nav className="navbar">
//       {/* Left: Brand */}
//       <div className="navbar-left">
//         <Link to="/" className="navbar-brand">
//           Lusso Movano
//         </Link>
//       </div>

//       {/* Right: Icons */}
//       <div className="navbar-right">
//         <div className="search-container">
//           <button
//             className="search-icon-button"
//             onClick={() => setShowSearch(!showSearch)}
//           >
//             <svg
//               className="search-icon"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="11" cy="11" r="8" />
//               <line x1="21" y1="21" x2="16.65" y2="16.65" />
//             </svg>
//           </button>
//           <input
//             type="text"
//             placeholder="Search..."
//             className={`search-input-expandable ${showSearch ? "show" : ""}`}
//           />
//         </div>

//         {/* Cart Icon */}
//         <Link to="/cart" className="icon-link" title="Cart">
//           <svg
//             className="navbar-icon"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="9" cy="21" r="1" />
//             <circle cx="20" cy="21" r="1" />
//             <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
//           </svg>
//         </Link>

//         {/* Profile Icon */}
//         <Link to="/profile" className="icon-link" title="Profile">
//           <svg
//             className="navbar-icon"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="7" r="4" />
//             <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
//           </svg>
//         </Link>

//         {/* Category Dropdown */}
//         <div className="category-dropdown">
//           <button
//             className="category-button"
//             onClick={() => setCategoryOpen(!categoryOpen)}
//           >
//             Menu
//           </button>
//           {categoryOpen && (
//             <div className="dropdown-menu">
//               <ul>
//                 <li>
//                   <Link to="/category/Tshirt">Tshirt</Link>
//                 </li>
//                 <li>
//                   <Link to="/category/hoodie">Hoodies</Link>
//                 </li>
//                 <li>
//                   <Link to="/category/pants">Pants</Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // Close search dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
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
         {/* Profile Icon */}
        <Link to="/profile" className="icon-link" title="Profile">
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
        </Link>
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

