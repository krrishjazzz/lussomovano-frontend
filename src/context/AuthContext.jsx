import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the token is in localStorage
    const token = localStorage.getItem("authToken");
    console.log(localStorage);
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is passed here
        },
      });
      setUser(response.data); // Set the user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response); // Log the entire response

      // Assuming the backend sends the token directly in response.data
      const token = response.data;
      console.log("Received Token:", token); // Log the token to verify it's valid

      if (token) {
        // Save the token in localStorage
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        fetchUserData(token); // Pass the token for fetching user data
      } else {
        console.error("Token not received correctly");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
