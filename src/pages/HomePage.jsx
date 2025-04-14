import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jungleImg from "../assets/collections/jungledrop.jpg";
import wildImg from "../assets/collections/wildwithin.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css"
import CollectionList from "../components/CollectionList"; // ✅ Use correct component
import { API } from "../config/api";

const collectionImages = {
  "Jungle Drop": jungleImg,
  "Wild Drop": wildImg,
};

export default function HomePage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await axios.get(API.COLLECTIONS);
      const enriched = res.data.map((c) => ({
        ...c,
        imageUrl: collectionImages[c.name], // inject correct image
      }));
      setCollections(enriched);
    } catch (err) {
      console.error("Failed to fetch collections", err);
    }
  };

  return (
    <div className="homepage">
      <Navbar />
      <main className="homepage-main">
        <CollectionList collections={collections} />
      </main>
      <Footer />
    </div>
  );
}

