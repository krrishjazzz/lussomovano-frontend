import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orders/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  return (
    <div className="orders-page">
      <Navbar />
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="order-date">
                Placed On: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.product.price}</p>
                      <p className="subtotal">
                        Subtotal: ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total:</strong> ₹{order.totalAmount}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
