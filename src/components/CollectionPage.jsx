import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/home.css";
import { API } from "../config/api";

export default function CollectionPage() {
  const { name } = useParams(); // collection name from URL
  const [products, setProducts] = useState([]);

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
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
