// src/context/AuthContext.js
import { createContext, useEffect, useState, useMemo } from "react";
import { TokenServices } from "../utils/TokenService";
import { PermissionServices } from "../utils/PermissionService";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = TokenServices.getToken();
    const permission = PermissionServices.getPermission();

    console.log("AuthContext check token:", token);
    if (token && permission) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    TokenServices.setToken(token);
    setIsAuthenticated(true);
    console.log("User logged in, token set:", token);
  };

  const logout = () => {
    TokenServices.removeToken();
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout, loading }),
    [isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
