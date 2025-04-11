import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

export default function HomePage() {
  console.log("🟢 HomePage component loaded");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    price: 0,
    available: true,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("📦 useEffect (on mount) triggered");
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("🔍 Filters/search/products updated – running handleFilters");
    handleFilters();
  }, [filters, searchQuery, products]);

  const fetchProducts = async () => {
    console.log("📡 fetchProducts called");
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      console.log("✅ Products fetched from backend:", res.data);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch products", error);
    }
  };

  const handleFilters = () => {
    let updated = [...products];
    console.log("🔧 Running filters with:", { filters, searchQuery });

    if (filters.category) {
      updated = updated.filter((p) => p.category === filters.category);
    }

    if (filters.price > 0) {
      updated = updated.filter((p) => p.price <= filters.price);
    }

    if (filters.available) {
      updated = updated.filter((p) => !p.outOfStock);
    }

    if (searchQuery.trim() !== "") {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    console.log("🎯 Filtered Products:", updated);
    setFilteredProducts(updated);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {console.log("🖼 Rendering HomePage JSX")}
      <Navbar />
      <HeroSection />
      <div className="flex px-6 py-4 gap-4">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
