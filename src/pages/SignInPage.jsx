import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import "../styles/signin.css";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, fetchUserData } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  // Handle Google OAuth token from redirect
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      console.log("Google OAuth token received:", token);
      localStorage.setItem("authToken", token);
      fetchUserData(token);
      navigate("/home");
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to /home");
      navigate("/home");
    }
  }, [isAuthenticated]);

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth");
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleAppleLogin = () => {
    alert("Apple login is not integrated yet.");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting email/password login...");
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signin-page">
      <Navbar />

      <div className="signin-container">
        <div className="signin-header">
          <h2>Sign In to Lusso Movano</h2>
          {!isEmailLogin && <p>Sign in with your email address or use:</p>}
        </div>

        {!isEmailLogin ? (
          <>
            <div className="signin-options">
              <button className="google-btn" onClick={handleGoogleLogin}>
                <FaGoogle className="signin-icon" />
                Sign In with Google
              </button>
              <button className="apple-btn" onClick={handleAppleLogin}>
                <FaApple className="signin-icon" />
                Sign In with Apple
              </button>
            </div>
            <div className="email-link">
              <p>
                Or{" "}
                <Link to="#" onClick={() => setIsEmailLogin(true)}>
                  sign in with your email
                </Link>
              </p>
            </div>
          </>
        ) : (
          <form onSubmit={handleEmailLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="signin-btn">
              Sign In
            </button>
            <div className="email-link">
              <p>
                Don't have an account? <Link to="/signup">Create one</Link>
              </p>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SignInPage;
