import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CollectionPage from "./components/CollectionPage";
import CategoryPage from "./components/CategoryPage";
import SignInPage from "./pages/SignInPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrdersPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/collection/:name" element={<CollectionPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </AuthProvider>
  );
}
