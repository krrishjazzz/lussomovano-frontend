import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Help</h4>
          <p>
            A Client Advisor is available at 1800 103 9988. You can also chat or
            email us.
          </p>
          <ul>
            <li>FAQ</li>
            <li>Product Care</li>
            <li>Stores</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>The Company</h4>
          <ul>
            <li>About Lusso Movano</li>
            <li>Lusso Equilibrium</li>
            <li>Code of Ethics</li>
            <li>Careers</li>
            <li>Legal</li>
            <li>Privacy & Cookie Policy</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Store Locator</h4>
          <p>Country/Region, City</p>
        </div>

        <div className="footer-column newsletter">
          <h4>Sign up for Lusso Movano Updates</h4>
          <p>
            By entering your email address below, you consent to receiving our
            newsletter with access to our latest collections, events, and
            initiatives. More details on this are provided in our Privacy
            Policy.
          </p>
          <input type="email" placeholder="Your email" />
          <select>
            <option>COUNTRY/REGION</option>
            <option>India</option>
            <option>United States</option>
            <option>UK</option>
          </select>
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-services">
        <div>
          <h5>Lusso Services</h5>
          <ul>
            <li>Discover Our Services</li>
            <li>Book an Appointment</li>
            <li>Collect In Store</li>
            <li>Store Locator</li>
          </ul>
        </div>
      </div>

      <div className="footer-brand">
        <h2>Lusso Movano</h2>
        <p>&copy; 2025 Lusso Movano. All rights reserved.</p>
      </div>
    </footer>
  );
}
