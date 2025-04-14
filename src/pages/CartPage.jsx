import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  // Get the userId from the JWT token if you have a way to extract it (e.g., from a decoded token)
  const userId = 1; // This should be dynamically extracted from your token or user session

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
    const totalAmount = calculateTotalAmount(); // Calculate the total amount of the order

    const orderData = {
      user: { id: userId }, // Add the user info
      items: cart.map((item) => ({
        product: { id: item.product.id }, // Include the productId
        quantity: item.quantity,
      })),
      totalAmount: totalAmount, // Include the total amount
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
    <div>
      <h2>Your Cart</h2>
      {cart.map((item, i) => (
        <div key={i}>
          <h3>{item.product.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>Price: ₹{item.product.price * item.quantity}</p>
        </div>
      ))}

      <div>
        <h3>Total: ₹{calculateTotalAmount()}</h3>
      </div>

      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
};

export default CartPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CartPage = () => {
//   const [cart, setCart] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const placeOrder = async () => {
//     const orderData = {
//       items: cart.map((item) => ({
//         product: { id: item.product.id },
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/orders/place",
//         orderData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Order placed successfully!");
//       localStorage.removeItem("cart");
//       setCart([]);
//     } catch (err) {
//       alert("Order failed.");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cart.map((item, i) => (
//         <div key={i}>
//           <h3>{item.product.name}</h3>
//           <p>Qty: {item.quantity}</p>
//           <p>Price: ₹{item.product.price * item.quantity}</p>
//         </div>
//       ))}

//       {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
//     </div>
//   );
// };

// export default CartPage;
