const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const API = {
  BASE: "http://localhost:8080",
  COLLECTIONS: `${API_BASE_URL}/api/products/collections`,
  // Add more endpoints here as needed
};
