import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    
    if (!token) {
      setLoading(false);
      return;
    }

    // Try to use saved user first for faster load
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
        setLoading(false);
        return;
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }

    // Fetch from API if no saved user
    try {
      const response = await getCurrentUser();
      setUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to load user:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (tokens) => {
    try {
      // Clear old data first
      clearAuth();
      
      // Save tokens
      localStorage.setItem("access_token", tokens.access_token);
      if (tokens.refresh_token) {
        localStorage.setItem("refresh_token", tokens.refresh_token);
      }

      // Fetch user data
      const response = await getCurrentUser();
      const userData = response.data;
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      clearAuth();
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
    window.location.href = '/';
  };

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
