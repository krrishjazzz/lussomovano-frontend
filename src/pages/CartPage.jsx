import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cart.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("authToken");

  const userId = 1; // Replace with real user ID extraction later

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const placeOrder = async () => {
    const totalAmount = calculateTotalAmount();

    const orderData = {
      user: { id: userId },
      items: cart.map((item) => ({
        product: { id: item.product.id },
        quantity: item.quantity,
      })),
      totalAmount,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/orders/place",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (err) {
      alert("Order failed.");
      console.error(err);
    }
  };

  return (
    <div className="cart-page">
      <Navbar hideCartIcon={true} /> {/* Optional prop to hide cart icon */}
      <div className="cart-container">
        <h2 className="cart-title">Your Shopping Bag</h2>
        {cart.length === 0 ? (
          <p className="empty-cart-msg">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, i) => (
                <div className="cart-item" key={i}>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.product.price}</p>
                    <p className="subtotal">
                      Subtotal: ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{calculateTotalAmount()}</h3>
              <button className="place-order-btn" onClick={placeOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
