import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jungleImg from "../assets/collections/jungledrop.jpeg";
import wildImg from "../assets/collections/wildwithin.jpeg";
// import "../styles/home.css";
import "../styles/global.css";
import "../styles/navbar.css";
import "../styles/hero.css";
import "../styles/products.css";
import "../styles/forms.css";
import "../styles/dropdown.css";
import "../styles/responsive.css";
import "../styles/collections.css";
import Navbar from "../components/Navbar";
import { API } from "../config/api"; // ✅ import centralized API

const collectionImages = {
    "Jungle Drop": jungleImg,
    "Wild Drop": wildImg,
}

export default function HomePage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get(API.COLLECTIONS); // ✅ use constant
      setCollections(res.data);
    } catch (err) {
      console.error("Failed to fetch collections", err);
    }
  };

  return (
    <div className="homepage">
      <Navbar />
      <main className="homepage-main">
        {/* <h2 className="collections-title">Our Collections</h2> */}
        <div className="collections-grid">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-item">
              <Link to={`/collection/${collection.name}`}>
                <div className="collection-card">
                  <img
                    // src={collection.imageUrl}
                    src={collectionImages[collection.name]}
                    alt={collection.name}
                    className="collection-image"
                  />
                  <h3 className="collection-name">{collection.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
