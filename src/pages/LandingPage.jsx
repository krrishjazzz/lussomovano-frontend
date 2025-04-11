import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4 transition-all duration-300">
      {console.log("🎨 Rendering LandingPage JSX")}
      <h1 className="text-6xl font-serif tracking-widest mb-4">Lusso Movano</h1>
      <p className="text-2xl font-light italic mb-12">
        When sophistication meets luxury
      </p>
      <button
        onClick={handleShopNowClick}
        className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
      >
        Shop Now
      </button>
    </div>
  );
}
