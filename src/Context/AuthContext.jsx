// src/context/AuthContext.jsx
import { createContext, useEffect, useState, useMemo } from "react";
import { TokenService } from "../utils/TokenService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = TokenService.getToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking auth token:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token) => {
    TokenService.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    TokenService.removeToken();
    setIsAuthenticated(false);
    // QueryClient.clear(); // Clear all query data
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout, loading }),
    [isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
