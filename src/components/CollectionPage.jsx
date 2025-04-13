import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/collectionspage.css";

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

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
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
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
