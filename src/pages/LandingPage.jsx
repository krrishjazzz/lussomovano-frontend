import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🟢 LandingPage mounted");
  }, []);

  const handleShopNowClick = () => {
    console.log("🛍️ 'Shop Now' button clicked");
    navigate("/home");
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Lusso Movano</h1>
      <p className="landing-tagline">Where sophistication meets luxury</p>
      <button className="landing-button" onClick={handleShopNowClick}>
        Shop Now
      </button>
    </div>
  );
}
