import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/collectionspage.css";
import Footer from "../components/Footer";

import { API } from "../config/api";

export default function CollectionPage() {
  const { name } = useParams(); // collection name from URL
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // quantity for each product

  useEffect(() => {
    fetchProductsByCollection();
  }, [name]);

  const fetchProductsByCollection = async () => {
    try {
      const res = await axios.get(
        `${API.BASE}/api/products/collection/${name}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: Number(value) });
  };

  const addToCart = (product, e) => {
    const quantity = quantities[product.id] || 1;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // === FLIGHT ANIMATION START ===
    const productCard = e.currentTarget.closest(".collection-card");
    const image = productCard.querySelector(".collection-image");
    const cartIcon = document.querySelector(".navbar-cart-icon");

    if (image && cartIcon) {
      const imageRect = image.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const flyingImage = image.cloneNode(true);
      flyingImage.classList.add("flying-image");

      flyingImage.style.position = "fixed";
      flyingImage.style.top = `${imageRect.top}px`;
      flyingImage.style.left = `${imageRect.left}px`;
      flyingImage.style.width = `${imageRect.width}px`;
      flyingImage.style.height = `${imageRect.height}px`;
      flyingImage.style.zIndex = 9999;
      flyingImage.style.transition =
        "all 0.8s cubic-bezier(0.65, -0.1, 0.3, 1.5)";

      document.body.appendChild(flyingImage);

      requestAnimationFrame(() => {
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.width = `40px`;
        flyingImage.style.height = `40px`;
        flyingImage.style.opacity = "0.4";
      });

      setTimeout(() => {
        document.body.removeChild(flyingImage);
      }, 900);
    }
  };


  return (
    <div className="homepage">
      <Navbar />
      <main className="homepage-main">
        <h2 className="collections-title">{name} Collection</h2>
        <div className="collections-grid">
          {products.map((product) => (
            <div key={product.id} className="collection-item">
              <div className="collection-card">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="collection-image"
                />
                <h3 className="collection-name">{product.name}</h3>
                <p>₹{product.price}</p>

                {/* Quantity selector */}
                <input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  className="quantity-input"
                />

                {/* Add to Cart button */}
                <button
                  onClick={(e) => addToCart(product, e)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
