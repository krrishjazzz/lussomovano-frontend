import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import "../styles/home.css";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/products/category/${categoryName}`
      );
      console.log("Fetched category products:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch category products", err);
    }
  };

  return (
    <div className="category-page">
      <Navbar />
      <main className="category-content">
        <h2 className="page-title">{categoryName.toUpperCase()}</h2>
        <div className="collections-grid">
          {Array.isArray(products) &&
            products.map((product) => (
              <div key={product.id} className="collection-item">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="collection-image"
                />
                <h3 className="collection-name">{product.name}</h3>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
