// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">Lusso Movano</h2>
        <div className="footer-links">
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
        <div className="footer-newsletter">
          <p>Join our newsletter</p>
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Lusso Movano. All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
