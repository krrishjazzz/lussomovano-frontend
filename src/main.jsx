// ✅ File: main.jsx or index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* ✅ MUST wrap App with this */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
