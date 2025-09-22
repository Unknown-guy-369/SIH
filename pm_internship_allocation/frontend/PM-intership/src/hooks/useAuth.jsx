import { useState } from "react";

export function useAuth() {
  // Replace this with your real authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  function login(token) {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return { isAuthenticated, login, logout };
}