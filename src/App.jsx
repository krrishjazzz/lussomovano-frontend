// ✅ File: App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CollectionPage from "./components/CollectionPage";
import CategoryPage from "./components/CategoryPage";

export default function App() {
  console.log("⚙️ App component rendered");

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/collection/:name" element={<CollectionPage />} /> {/* ✅ */}
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
}
