import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const placeOrder = async () => {
    const orderData = {
      items: cart.map((item) => ({
        product: { id: item.product.id },
        quantity: item.quantity,
      })),
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/orders",
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
    <div>
      <h2>Your Cart</h2>
      {cart.map((item, i) => (
        <div key={i}>
          <h3>{item.product.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>Price: ₹{item.product.price * item.quantity}</p>
        </div>
      ))}

      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
};

export default CartPage;
